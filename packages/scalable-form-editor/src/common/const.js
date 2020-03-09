/**
 * APP中常量配置，注意都要携带命名空间
 */

// action creator types

export const XFORM_BUILDER_GET_DATASOURCE = 'xform-builder-get-datasource-list';
export const XFORM_BUILDER_GET_FORM_DATASOURCE = 'xform-builder-get-form-datasource-list';
export const XFORM_BUILDER_GET_SERVER_CODE = 'xform-builder-get-server-code';

export const XFORM_BUILDER_INIT_FIELDS = 'xform-builder-init-fields';
export const XFORM_BUILDER_ADD_FIELDS = 'xform-builder-add-fields';
export const XFORM_BUILDER_ADD_FIELDS_WITH_INDEX = 'xform-builder-add-fields-with-index';
export const XFORM_BUILDER_DELETE_FIELDS = 'xform-builder-delete-fields';
export const XFORM_BUILDER_UPDATE_FIELDS_ITEM = 'xform-builder-update-fields-item';

export const XFORM_BUILDER_UPDATE_SYSTEM_FIELDS = 'xform-builder-update-system-fields';
export const XFORM_BUILDER_CLEAR_SYSTEM_FIELDS = 'xform-builder-clear-system-fields';

export const XFORM_BUILDER_UPDATE_COMMON_FIELDS = 'xform-builder-update-common-fields';
export const XFORM_BUILDER_CLEAR_COMMON_FIELDS = 'xform-builder-clear-common-fields';

export const XFORM_BUILDER_UPDATE_BIZ = 'xform-builder-update-biz-data';
export const XFORM_BUILDER_CLEAR_BIZ = 'xform-builder-clear-biz-data';

export const XFORM_BUILDER_UPDATE_OPTION_BIZ = 'xform-builder-update-option-biz-data';
export const XFORM_BUILDER_CLEAR_OPTION_BIZ = 'xform-builder-clear-option-biz-data';

export const XFORM_BUILDER_UPDATE_EDIT_FIELD = 'xform-builder-update-edit-field-data';

export const XFORM_BUILDER_UPDATE_LANGS = 'xform-builder-update-langs';
export const XFORM_BUILDER_CLEAR_LANGS = 'xform-builder-clear-langs';

export const XFORM_BUILDER_UPDATE_GLOBAL_CONFIG = 'xform-builder-update-global-config';

export const XFORM_OPTION_BIZ_NAME = 'options';
export const CONFIGUEABLE_FIELD_CONFIG_CODE = ['code', 'placeholder', 'description', 'value', 'dataSource', 'validate', 'server', 'require', 'hidden'];

export const DragDropItemTypes = {
    field: 'field', // 字段拖拽排序
    option: 'option',    // 选项拖拽排序
    picker: 'picker'    // 从左侧拖拽增加一个字段
};

// localStorage命名空间
export const LOCALSTORAGE_NAMESPACE = 'xform';

// topbar的高度数值
export const TOPBAR_HEIGHT = 48;

// 放置在【基础属性】配置区域的配置项和放置在【高级属性】配置区域的配置项
export const XFORM_CONFIG_FIELDS = {
    basic: ['name', 'code', 'placeholder', 'value', 'description', 'maxLength', 'maximum', 'minimum', 'require', 'hidden', 'disabled', 'groupName', 'uploadType', 'initRange', 'maxFileSize', 'maxFileNum', 'templateFileUrl', 'exampleImageUrl', 'selectLeafOnly', 'treeCheckStrictly'],
    advance: ['dataSource', 'validate', 'server', 'cascade']
};
