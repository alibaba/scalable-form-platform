/**
 * 图片上传组件
 */
import React, { useCallback, useEffect, useState } from 'react';
import { ImagePicker, List, Modal } from 'antd-mobile';
import classNames from 'classnames';
import { WidgetProps } from 'scalable-form-core';
import {
  FileStatus,
  getRandomString,
  ScalableFormError,
  UploadFile,
  useLogWidgetPV,
  ErrorCode,
  useGetMessage,
} from 'scalable-form-tools';
import './index.less';
import { DEFAULT_MAX_FILE_NUMBER, DEFAULT_MAX_FILE_SIZE } from '../config';
import { MobileFormContext } from '../types';

const ListItem = List.Item;

interface Options {
  maxFileNum: number;
  maxFileSize: number;
  exampleImageUrl: UploadFile[];
}

const UploadWidget: React.FC<WidgetProps<UploadFile[], Options, MobileFormContext>> = (
  props: WidgetProps<UploadFile[], Options, MobileFormContext>,
) => {
  useLogWidgetPV('upload');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { onChange, required, readonly, disabled, value, schema, options, formContext } = props;
  const { onAddImageClick, customUploadRequest, onError } = formContext;
  const { maxFileNum = DEFAULT_MAX_FILE_NUMBER, maxFileSize = DEFAULT_MAX_FILE_SIZE } = schema;
  const exampleImages = options.exampleImageUrl;
  const hasExampleImage = exampleImages && exampleImages.length > 0;
  const exampleImageUrl = hasExampleImage ? exampleImages[0].url : '';
  const files = fileList.map((item) => {
    return {
      ...item,
      id: item.uid,
    };
  });
  useEffect(() => {
    const newFileList = checkUploadFileListUniqueId(value || []);
    setFileList([...newFileList]);
  }, [value]);
  const handleInsertImgClicked = useCallback(() => {
    if (onAddImageClick) {
      onAddImageClick({
        maxFileNum,
        maxFileSize,
        currentFileNum: fileList.length,
      })
        .then((urls: string[]) => {
          urls.forEach((url) => {
            fileList.push({
              uid: `rc-upload-${getRandomString(10)}`,
              url,
              status: FileStatus.DONE,
            });
          });
          onChange([...fileList]);
        })
        .catch((e: Error) => {
          onError(new ScalableFormError(ErrorCode.BIZ_ERROR, e));
        });
    }
  }, [fileList, maxFileNum, maxFileSize, onAddImageClick, onChange, onError]);
  const handlePreviewImage = useCallback((url: string) => {
    setPreviewImageUrl(url);
    setModalVisible(true);
  }, []);
  const handleImageChanged = useCallback(
    (originFiles: UploadFile[]) => {
      if (onAddImageClick) {
        onChange(originFiles);
      } else {
        const uploadFiles = originFiles.filter((file) => {
          return typeof file.file === 'object';
        });
        if (uploadFiles && uploadFiles.length > 0) {
          if (customUploadRequest) {
            customUploadRequest(uploadFiles, {
              maxFileNum,
              maxFileSize,
              currentFileNum: fileList.length,
            })
              .then((urls: string[]) => {
                urls.forEach((url) => {
                  fileList.push({
                    uid: `rc-upload-${getRandomString(10)}`,
                    url,
                    status: FileStatus.DONE,
                  });
                });
                setFileList([...fileList]);
                onChange([...fileList]);
              })
              .catch((e: Error) => {
                onError(new ScalableFormError(ErrorCode.BIZ_ERROR, e));
              });
          } else {
            onChange([...originFiles]);
          }
        } else {
          setFileList(originFiles);
          onChange([...originFiles]);
        }
      }
    },
    [onAddImageClick, customUploadRequest, onChange, onError, maxFileNum, maxFileSize, fileList],
  );
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const uploadLinkMessage = useGetMessage('xformUploaderExampleLink');
  return (
    <div
      className={classNames({
        'scalable-form-widget': true,
        'scalable-form-upload': true,
        disabled,
      })}
    >
      <ListItem
        wrap
        multipleLine
        extra={
          hasExampleImage ? (
            <a
              className="example-link"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                e.stopPropagation();
                handlePreviewImage(exampleImageUrl);
              }}
            >
              {uploadLinkMessage}
            </a>
          ) : null
        }
      >
        <label
          className={classNames({
            required,
          })}
        >
          {schema.title}
        </label>
      </ListItem>
      <ListItem
        extra={
          <ImagePicker
            files={files}
            selectable={files.length < maxFileNum && !disabled && !readonly}
            multiple
            onChange={handleImageChanged}
            onAddImageClick={handleInsertImgClicked}
            onImageClick={(index = 0, originFiles: UploadFile[]) => {
              handlePreviewImage(originFiles[index] && originFiles[index].url);
            }}
          />
        }
      />
      <Modal
        visible={modalVisible}
        title=""
        transparent
        animationType="fade"
        maskClosable
        onClose={handleCloseModal}
        footer={[]}
        className="scalable-form-image-preview-modal"
      >
        <div className="scalable-form-image-preview-wrapper">
          <img src={previewImageUrl} onTouchStart={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};

UploadWidget.displayName = 'UploadWidget';
export default React.memo(UploadWidget);

/**
 * 检查传入组件的数据中是不是有uid字段，如果没有uid，要默认生成一个uid
 * @param {UploadFile[]} fileList
 * @returns {UploadFile[]}
 */
function checkUploadFileListUniqueId(fileList: UploadFile[]) {
  const result: UploadFile[] = [];
  // 兼容判断，有些场景初始value写的是‘’
  if (Array.isArray(fileList)) {
    fileList.forEach((dataItem) => {
      if (dataItem.uid) {
        result.push({ ...dataItem });
      } else {
        result.push({
          ...dataItem,
          uid: `rc-upload-${getRandomString(10)}`,
        });
      }
    });
    return result;
  } else {
    return result;
  }
}
