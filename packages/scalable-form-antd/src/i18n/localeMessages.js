/**
 * 国际化文案
 */

import i18n from './index';

const localMessages = {
    //index.js
    xformDefaultSubmitButtonLabel: {
        id: 'xform-antd.index.xformDefaultSubmitButtonLabel',
        defaultMessage: '提交'
    },
    xformUploaderUploadingStatusCheckMessage: {
        id: 'xform-antd.index.xformUploaderUploadingStatusCheckMessage',
        defaultMessage: '图片/文件上传中，请稍后提交'
    },
    xformUploaderErrorStatusCheckMessage: {
        id: 'xform-antd.index.xformUploaderErrorStatusCheckMessage',
        defaultMessage: '图片/文件上传失败，请重新上传后再提交'
    },
    xformUploaderImageFileCheckMessage: {
        id: 'xform-antd.index.xformUploaderImageFileCheckMessage',
        defaultMessage: '上传的不是图片类型文件，请重新上传图片'
    },
    xformUploaderFileCheckMessage: {
        id: 'xform-antd.index.xformUploaderFileCheckMessage',
        defaultMessage: '上传的文件不合法，请重新上传'
    },
    // xformMultiSelectWidget.js
    xformCheckAllLabel: {
        id: 'xform-antd.multiSelect.xformCheckAllLabel',
        defaultMessage: '全选'
    },
    // xformDateRangePicker.js
    xformDefaultStartDatePlaceholder: {
        id: 'xform-antd.dateRange.xformDefaultStartDatePlaceholder',
        defaultMessage: '开始日期'
    },
    xformDefaultEndDatePlaceholder: {
        id: 'xform-antd.dateRange.xformDefaultEndDatePlaceholder',
        defaultMessage: '结束日期'
    },
    // xformUpload.js
    xformMaxFileNumErrorTip: {
        id: 'xform-antd.upload.xformMaxFileNumErrorTip',
        defaultMessage: '上传文件超出最大限制'
    },
    xformMaxFileSizeErrorTip: {
        id: 'xform-antd.upload.xformMaxFileSizeErrorTip',
        defaultMessage: '超出文件大小最大限制：'
    },
    xformUploadErrorTip: {
        id: 'xform-antd.upload.xformUploadErrorTip',
        defaultMessage: '上传失败，请稍后重试.'
    },
    xformBatchUploadToolTip: {
        id: 'xform-antd.upload.xformBatchUploadToolTip',
        defaultMessage: 'ctrl/command键可批量上传'
    },
    xformBatchUploadDefaultLabel: {
        id: 'xform-antd.upload.xformBatchUploadDefaultLabel',
        defaultMessage: '上传'
    },
    xformExampleImageLabel: {
        id: 'xform-antd.upload.xformExampleImageLabel',
        defaultMessage: '示例图片'
    },
    xformFileTemplateLabel: {
        id: 'xform-antd.upload.xformFileTemplateLabel',
        defaultMessage: '模板'
    }
};

let messages;
if (typeof location !== 'undefined' && location.href.indexOf('mock=true') > -1) {
    const locale = (typeof navigator !== 'undefined' && navigator.language.toLocaleLowerCase()) || 'en-us';
    messages = {
        [locale]: {}
    };
    Object.keys(localMessages).map((key) => {
        messages[locale]['xform.client.' + localMessages[key].id] = localMessages[key].defaultMessage;
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
