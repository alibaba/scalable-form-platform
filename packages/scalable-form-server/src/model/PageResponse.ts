export default interface PageResponse {
  statusCode: number;
  contentType: string;
  content: string,
  type: 'HTML'
}

export function getHTMLResponse(content: string): PageResponse {
  return {
    statusCode: 200,
    contentType: 'text/html;charset=UTF-8',
    content,
    type: 'HTML'
  };
}
