/**
 * 文件上传状态描述码
 */
enum FileStatus {
  /**
   * 上传成功
   * @type {string}
   */
  SUCCESS = 'success',
  /**
   * 上传完成并成功
   * @type {string}
   */
  DONE = 'done',
  /**
   * 上传中
   * @type {string}
   */
  UPLOADING = 'uploading',
  /**
   * 上传出错
   * @type {string}
   */
  ERROR = 'error',
  /**
   * 文件从Uploader中移除
   * @type {string}
   */
  REMOVED = 'removed',
}

export default FileStatus;
