import FileStatus from './FileStatus';

/**
 * 封装上传文件类型
 */
export default interface ScalableUploadFile {
  /**
   * 唯一id，上传时，会自动为每一个上传文件创建一个唯一id
   */
  uid: number | string;
  /**
   * 上传成功后，文件在服务端的地址
   */
  url: string;
  /**
   * 文件上传状态码
   */
  status: FileStatus;
  /**
   * 文件原始名称，用于下载时对文件重新命名
   */
  name?: string;
  /**
   * 文件原始二进制文件，当文件未上传时，file中包含了原始的二进制数据，上传成功后会清除
   */
  file?: File;
}
