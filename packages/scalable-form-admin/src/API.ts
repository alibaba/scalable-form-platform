const nattyFetch = require('natty-fetch');
const useMock = location.href.indexOf('xform-mock') > -1;
const context = nattyFetch.context({
  mock: useMock,
  method: 'GET',
  fit: (response: any) => {
    if (response.success) {
      return {
        success: response.success,
        content: response.data
      };
    } else {
      return {
        success: response.success,
        error: response.message
      }
    }
  }
});

context.create({
  getFormList: {
    url: `${getAPIPrefix()}/queryFormList`,
    data: {}
  },
  saveForm: {
    method: 'POST',
    url: `${getAPIPrefix()}/saveForm`,
    data: {}
  },
  saveData: {
    method: 'POST',
    url: `${getAPIPrefix()}/saveData`,
    data: {}
  },
  deleteData: {
    url: `${getAPIPrefix()}/deleteData`,
    data: {}
  },
  exportData: {
    url: `${getAPIPrefix()}/exportData`,
    data: {}
  },
  deleteSchema: {
    url: `${getAPIPrefix()}/deleteSchema`,
    data: {}
  },
  getDataList: {
    url: `${getAPIPrefix()}/getDataList`,
    data: {}
  },
  initDB: {
    url: `${getAPIPrefix()}/initDB`,
    data: {}
  }
});

export default {
  ...context.api
};

function getAPIPrefix() {
  let serverPath = (window as any).serverPath || '';
  serverPath = serverPath.trim().toLowerCase().replace(/\*$/, '').replace(/\/$/, '');
  return serverPath;
}
