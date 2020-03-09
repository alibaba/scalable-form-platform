/**
 * 国际化文案
 */

import i18n from './index';

const localMessages = {
    //index.js
    xformDefaultSubmitButtonLabel: {
        id: 'xform-antd-mobile.index.xformDefaultSubmitButtonLabel',
        defaultMessage: '提交'
    },

    // xformDateRangePicker.js
    xformDefaultStartDatePlaceholder: {
        id: 'xform-antd-mobile.dateRange.xformDefaultStartDatePlaceholder',
        defaultMessage: '开始日期'
    },
    xformDefaultEndDatePlaceholder: {
        id: 'xform-antd-mobile.dateRange.xformDefaultEndDatePlaceholder',
        defaultMessage: '结束日期'
    },
    // xformUpload.js
    xformUploaderUploadingStatusCheckMessage: {
        id: 'xform-antd-mobile.index.xformUploaderUploadingStatusCheckMessage',
        defaultMessage: '图片/文件上传中，请稍后提交'
    },
    xformUploaderErrorStatusCheckMessage: {
        id: 'xform-antd-mobile.index.xformUploaderErrorStatusCheckMessage',
        defaultMessage: '图片/文件上传失败，请重新上传后再提交'
    },
    xformUploaderExampleLink: {
        id: 'xform-antd-mobile.index.xformUploaderExampleLink',
        defaultMessage: '示例图片'
    }
};

let messages;
if (typeof location !== 'undefined' && location.href.indexOf('mock=true') > -1) {
    const locale = (typeof navigator !== 'undefined' && navigator.language.toLocaleLowerCase()) || 'en-us';
    messages = {
        [locale]: {}
    };
    Object.keys(localMessages).map((key) => {
        messages['zh-cn']['xform.client.' + localMessages[key].id] = localMessages[key].defaultMessage;
    });
} else {
    messages = i18n;
}

export const getMessageId = (code) => {
    return 'xform.client.' + localMessages[code].id;
};

let localMessagesArray = [];
Object.keys(localMessages).map((key) => {
    localMessagesArray.push({
        id: localMessages[key].id,
        defaultMessage: localMessages[key].defaultMessage
    });
});

export {localMessagesArray};

export {messages};
