import {getContext} from '../context';
import {XFormServerConfig} from "../XFormServerConfig";

export function getServerPath(): string {
  let serverPath = getContext().serverConfig.path || '';
  serverPath = serverPath.trim().toLowerCase().replace(/\*$/, '').replace(/\/$/, '');
  return serverPath;
}

export function getUUIDFromPath(path: string) {
  const serverPath = getServerPath();
  const uuid: string = path.trim().replace(`${serverPath}/portal/`, '');
  return uuid;
}

export function isInPath(config: XFormServerConfig, path: string) {
  const reg = new RegExp(`(${config.path})(w)*`);
  return reg.test(path);
}

export function parseFormDataToObj(source: any) {
  return Object.keys(source).reduce(function (output, key) {
    const parentKey = key.match(/[^\[]*/i);
    let paths = key.match(/\[.*?\]/g) || [];
    paths = [parentKey[0]].concat(paths).map((keyI: any) => {
      return keyI.replace(/\[|\]/g, '');
    });
    let currentPath = output;
    while (paths.length) {
      const pathKey = paths.shift();
      if (pathKey in currentPath) {
        currentPath = currentPath[pathKey];
      } else {
        currentPath[pathKey] = paths.length ? isNaN(paths[0] as any) ? {} : [] : source[key];
        currentPath = currentPath[pathKey];
      }
    }
    return output;
  }, {});
}
