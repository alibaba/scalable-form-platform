/**
 * @file image/file upload widget
 * @description 图片或文件上传 widget
 * @props  formContext.customUploadRequest（自定义上传方法） value（值为fileList的数据结构）
 * @states fileList（上传的文件的 info，antd 数据结构）
 * {
 *     uid: -1,
 *     name: 'xxx.png',
 *     status: 'done',
 *     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
 * }
 */

import React, { useCallback, useMemo } from 'react';
import cls from 'classnames';
import { Upload, Button, Tooltip, Popover, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps, RcFile, UploadChangeParam } from 'antd/es/upload';
import { WidgetProps } from 'scalable-form-core';
import { useLogWidgetPV, UploadFile, FileStatus, getRandomString } from 'scalable-form-tools';

import './index.less';
import { BaseFormContext } from '../types';
import { useControlState } from '../common/use-control-state';

type ListItem<T extends any[]> = T extends ReadonlyArray<infer R> ? R : never;
type AntdUploadFile = ListItem<NonNullable<UploadProps['fileList']>>;
type RcCustomRequestOptions = Parameters<NonNullable<UploadProps['customRequest']>>[0];
type ScalableUploadFile = UploadFile & { response?: any }; // 向前兼容

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
type UploadWidgetOptions = Pick<
  UploadProps,
  | 'accept'
  | 'action'
  | 'method'
  | 'directory'
  | 'data'
  | 'headers'
  | 'listType'
  | 'multiple'
  | 'name'
  | 'showUploadList'
  | 'withCredentials'
> & {
  /**
   * 上传按钮或文字 label
   */
  label: string;
  /**
   * 表示配置的模板地址，如果该字段非空字符串，则在提交按钮右侧展示“模板”
   */
  templateFileUrl?: ScalableUploadFile[];
  /**
   * 表示配置的示例图片，如果该字段非空字符串，则在字段下面展示“示例图片”
   */
  exampleImageUrl?: Array<{ url: string }>;
};
/* eslint-enable @typescript-eslint/indent */

type UploadWidgetProps = WidgetProps<ScalableUploadFile[], UploadWidgetOptions, BaseFormContext>;

function pickUploadFile(itemFile: ScalableUploadFile | AntdUploadFile): ScalableUploadFile {
  const { uid, url, status, name, response } = itemFile;
  // 在本组件中能确保 url 和 status 都存在，为了类型兼容，强制指定
  return { uid, url, status, name, response } as ScalableUploadFile;
}

// TODO: i18n

const UploadWidget: React.FC<UploadWidgetProps> = (props) => {
  useLogWidgetPV('upload');
  const { schema, className, value, disabled, readonly, onChange, options, formContext } = props;
  const mValue = useMemo<ScalableUploadFile[] | undefined>(() => {
    if (!Array.isArray(value)) {
      return undefined;
    }
    return value.map((item) => {
      const pickedItem = pickUploadFile(item);
      if (pickedItem.uid != null) {
        return pickedItem;
      }
      return {
        ...pickedItem,
        uid: `rc-upload-${getRandomString()}`,
      };
    });
  }, [value]);

  const [fileList, setFileList] = useControlState<ScalableUploadFile[]>(mValue || []);
  const maxFileNum = schema.maxFileNum || Infinity;
  const maxFileSize = schema.maxFileSize || Infinity;
  const { label, listType = 'text', templateFileUrl, exampleImageUrl, ...restOptions } = options;
  const { customUploadRequest, onImagePreview } = formContext;

  const clns = cls(
    'ant-form-item-control',
    'xform-custom-widget',
    'xform-custom-uploader',
    { 'upload-list-inline': listType !== 'picture' },
    className,
  );

  /**
   * 自定义上传函数
   */
  const customRequest = useCallback(
    (reqOptions: RcCustomRequestOptions) => {
      if (typeof customUploadRequest !== 'function') {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(
            // eslint-disable-next-line max-len
            '[scalable-form-antd]: customUploadRequest props need to be configured before using image/file upload. For more detail, please see customUpload props in Upload component in ant design project',
          );
        }
        return;
      }

      const { onSuccess, onError } = reqOptions;
      // antd Upload 组件此处的 file 其实是 RcFile， 但是类型却被标注为 File，强转一下
      const file = reqOptions.file as RcFile;

      customUploadRequest(file)
        .then((url: string) => {
          const newFileCollection: ScalableUploadFile[] = [
            ...fileList.filter(({ uid }) => uid !== file.uid),
            { ...pickUploadFile(file), url },
          ];

          setFileList(newFileCollection);
          // TODO: adapter
          // 这个会将传入的值放到 Upload 组件的 file.response 里面, xform 数据格式需要
          onSuccess(url as any, file);
          onChange(newFileCollection);
        })
        .catch((e: Error) => {
          typeof onError === 'function' && onError(e);
        });
    },
    [customUploadRequest, onChange, fileList, setFileList],
  );
  /**
   * 上传前的处理
   */
  const beforeUpload = useCallback(
    (rcFile: RcFile, rcFileList: RcFile[]) => {
      const filename = rcFile.name;
      const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];

      const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

      // 文件的扩展名不能在黑名单里
      if (blacklistExts.indexOf(ext) > -1) {
        message.error('上传的文件不合法，请重新上传');
        return false;
      }

      // 文件数量不能超出最大限制
      if (fileList.length + rcFileList.length > maxFileNum) {
        message.error('上传文件超出最大限制');
        return false;
      }

      // 文件大小不能超过配置
      if (rcFile.size > maxFileSize * 1024 * 1024) {
        message.error(`${rcFile.name}超出文件大小最大限制：${maxFileSize}M`);
        return false;
      }

      return true;
    },
    [fileList, maxFileNum, maxFileSize],
  );
  /**
   * Antd Upload Component onChange handler
   */
  const handleChange = useCallback(
    (info: UploadChangeParam<AntdUploadFile>) => {
      const { file: rcFile, fileList: rcFileList } = info;
      const { name: filename, status } = rcFile;
      const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
      const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

      if (status === FileStatus.ERROR) {
        message.error(`${filename}上传失败，请稍后重试`);
      }

      let newFileList: ScalableUploadFile[] = [];
      // 文件数量不能超出最大限制
      // 文件大小不能超过配置
      // 文件扩展名不能在黑名单里
      if (
        rcFileList.length > maxFileNum ||
        rcFile.size > maxFileSize * 1024 * 1024 ||
        blacklistExts.indexOf(ext) > -1
      ) {
        newFileList = fileList;
      } else {
        newFileList = rcFileList.map((item) => pickUploadFile(item));
      }
      setFileList(newFileList);
      onChange(newFileList);
    },
    [onChange, fileList, maxFileNum, maxFileSize, setFileList],
  );
  /**
   * Antd Upload Component onRemove handler
   */
  const handleRemove = useCallback(
    (aFile: AntdUploadFile) => {
      if (disabled) {
        return false;
      }

      const filterFileList = fileList.filter((item) => aFile.uid !== item.uid);
      setFileList(filterFileList);
      onChange(filterFileList);
      return true;
    },
    [disabled, fileList, onChange, setFileList],
  );
  /**
   * preView action handler
   */
  const handleImageView = useCallback(
    (url?: string) => {
      if (typeof url === 'string' && typeof onImagePreview === 'function') {
        onImagePreview(url);
      }
    },
    [onImagePreview],
  );
  /**
   * Antd Upload Component onPreview handler
   */
  const handlePreview = useCallback(
    (aFile: AntdUploadFile) => {
      let url = '';
      fileList.some((item) => {
        if (item.uid === aFile.uid) {
          url = item.url;
          return true;
        }

        return false;
      });
      if (url) {
        handleImageView(url);
      }
    },
    [fileList, handleImageView],
  );

  return (
    <div className={clns}>
      <div className="uploader-action-wrapper">
        <Upload
          multiple
          withCredentials
          listType={listType}
          disabled={disabled || readonly}
          {...restOptions}
          fileList={fileList as AntdUploadFile[]}
          customRequest={customRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onRemove={handleRemove}
          onPreview={handlePreview}
        >
          {/* TODO: i18n */}
          <Tooltip placement="top" title="ctrl/command键可批量上传">
            <Button type="ghost" disabled={disabled}>
              <UploadOutlined />
              {label || '上传'}
            </Button>
          </Tooltip>
        </Upload>
        {Array.isArray(templateFileUrl) && templateFileUrl.length > 0 ? (
          <a className="template-trigger-link" href={templateFileUrl[0].url} download={templateFileUrl[0].name}>
            模板
          </a>
        ) : null}
        {Array.isArray(exampleImageUrl) && exampleImageUrl.length > 0 ? (
          <div className="example-pic-wrapper">
            <p className="example-pic-trigger-label">示例图片</p>
            <Popover
              content={<img src={exampleImageUrl[0].url} onClick={() => handleImageView(exampleImageUrl[0].url)} />}
              overlayClassName="xform-custom-uploader-popover"
              arrowPointAtCenter
            >
              <img
                className="example-pic-trigger"
                src={exampleImageUrl[0].url}
                onClick={() => handleImageView(exampleImageUrl[0].url)}
              />
            </Popover>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(UploadWidget);
