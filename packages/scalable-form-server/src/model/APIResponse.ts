export default interface APIResponse {
  success: boolean;
  code?: string,
  message?: string,
  data?: any,
  type: 'JSON'
}

export function getErrorResponse(errorCode: string, errorMessage: string): APIResponse {
  return {
    success: false,
    code: errorCode || 'FAIL_BIZ_DEFAULT',
    message: errorMessage,
    data: null,
    type: 'JSON'
  };
}

export function getSuccessResponse(data: any): APIResponse {
  return {
    success: true,
    code: '',
    message: '',
    data,
    type: 'JSON'
  };
}
