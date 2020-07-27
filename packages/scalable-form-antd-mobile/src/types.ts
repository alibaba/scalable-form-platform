import { UploadFile } from 'scalable-form-tools';
import ScalableFormError from 'scalable-form-tools/src/error/ScalableFormError';

/**
 * 移动端FormContext，用于透传上下文属性到各widget组件
 */
export interface MobileFormContext {
  /**
   * 用户自定义上传方法，返回上传成功后的文件url地址
   * @param {UploadFile[]} uploadFiles 上传二进制文件
   * @param {{maxFileNum: number maxFileSize: number currentFileNum: number}} options
   * @returns {Promise<string[]>} 返回上传成功后的文件url地址
   */
  customUploadRequest?: (
    uploadFiles: UploadFile[],
    options: {
      maxFileNum: number;
      maxFileSize: number;
      currentFileNum: number;
    },
  ) => Promise<string[]>;
  /**
   * 点击图片上传按钮时触发，用户自定义获取图片逻辑，适用于移动端上需要调用sdk能力实现图片拍照的场景
   * @param {{maxFileNum: number maxFileSize: number currentFileNum: number}} params
   * @returns {Promise<string[]>} 返回上传成功后的文件url地址
   */
  onAddImageClick?: (params: { maxFileNum: number; maxFileSize: number; currentFileNum: number }) => Promise<string[]>;
  /**
   * 用户自定义错误处理
   * @param {ScalableFormError} e
   */
  onError: (e: ScalableFormError) => void;
}
