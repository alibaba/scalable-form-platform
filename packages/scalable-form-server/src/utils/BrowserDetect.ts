interface DetectResult {
  isMobile?: boolean,
  iPhone?: boolean,
  iPad?: boolean,
  Android?: boolean,
}

export function detect(headers: { [key: string]: string }): DetectResult {
  const ua = headers['user-agent'];
  const result: DetectResult = {};

  if (/mobile/i.test(ua)) {
    result.isMobile = true;
  }
  result.iPhone = /iPhone/.test(ua);
  result.iPad = /iPad/.test(ua);
  result.Android = /Android/.test(ua);
  result.isMobile = (result.iPhone || result.iPad || result.Android);
  return result;
}

export function isMobile(headers: { [key: string]: string }): boolean {
  return (detect(headers).isMobile || false);
}
