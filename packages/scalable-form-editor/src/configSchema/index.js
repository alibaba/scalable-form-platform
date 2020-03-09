/**
 * 自定义类型表单配置form的schema（对于不同的自定义类型的表单，可能会有不同的自定义字段属性设置）
 */

import {getMessageId} from '../i18n/localeMessages';

const getIntlConfigSchema = (messages, registerWidgets, supportList) => {
    // hasItemSetting标识这种类型的选择器是否有“下拉框选项设置”

    const configSchema = {
        label: {
            icon: '&#xe674;',
            label: messages[getMessageId('configSchemaLabelLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:help': messages[getMessageId('configSchemaLabelHelp')],
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                value: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValuePlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: messages[getMessageId('configSchemaLabelDefaultValue')],
                dataSource: '',
                hidden: false
            }
        },
        group: {
            icon: '&#xe8b6;',
            label: messages[getMessageId('configSchemaGroupLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    groupName: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaGroupNameTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:widget': 'hidden',
                    'ui:help': messages[getMessageId('configSchemaLabelHelp')],
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                groupName: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaGroupNamePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                groupName: ''
            }
        },
        input: {
            icon: '&#xe6fe;',
            label: messages[getMessageId('configSchemaInputLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    validate: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValidateTitle')],
                        enum: ['', 'email', 'url', 'telephone', 'id', 'digit', 'money'],
                        enumNames: [
                            messages[getMessageId('configSchemaValidateOption1')],
                            messages[getMessageId('configSchemaValidateOption2')],
                            messages[getMessageId('configSchemaValidateOption3')],
                            messages[getMessageId('configSchemaValidateOption4')],
                            messages[getMessageId('configSchemaValidateOption5')],
                            messages[getMessageId('configSchemaValidateOption6')],
                            messages[getMessageId('configSchemaValidateOption7')]
                        ]
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    maxLength: {
                        type: 'number',
                        minimum: 0,
                        multipleOf: 10,
                        title: messages[getMessageId('configSchemaMaxLengthTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                value: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                validate: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValidatePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                },
                maxLength: {
                    'ui:widget': 'updown'
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonInputPlaceholder')],
                value: '',
                description: '',
                dataSource: '',
                validate: '',
                server: '',
                cascade: false,
                maxLength: 0,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        textarea: {
            icon: '&#xe61e;',
            label: messages[getMessageId('configSchemaTextareaLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    validate: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValidateTitle')],
                        enum: ['', 'email', 'url', 'telephone', 'id', 'digit' ,'money'],
                        enumNames: [
                            messages[getMessageId('configSchemaValidateOption1')],
                            messages[getMessageId('configSchemaValidateOption2')],
                            messages[getMessageId('configSchemaValidateOption3')],
                            messages[getMessageId('configSchemaValidateOption4')],
                            messages[getMessageId('configSchemaValidateOption5')],
                            messages[getMessageId('configSchemaValidateOption6')],
                            messages[getMessageId('configSchemaValidateOption7')]
                        ]
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    maxLength: {
                        type: 'number',
                        minimum: 0,
                        multipleOf: 10,
                        title: messages[getMessageId('configSchemaMaxLengthTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                value: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                validate: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValidatePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                },
                maxLength: {
                    'ui:widget': 'updown'
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonInputPlaceholder')],
                value: '',
                description: '',
                dataSource: '',
                validate: '',
                server: '',
                cascade: false,
                maxLength: 0,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        richtext: {
            icon: '&#xe6f9;',
            label: messages[getMessageId('configSchemaRichtextLabel')],
            platform: ['laptop'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                value: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValuePlaceholder')],
                        height: 200
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: '',
                value: '',
                description: '',
                require: false,
                hidden: false
            }
        },
        number: {
            icon: '&#xe6f6;',
            label: messages[getMessageId('configSchemaNumberLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    },
                    maximum: {
                        type: 'number',
                        multipleOf: 10,
                        title: messages[getMessageId('configSchemaMaximumTitle')]
                    },
                    minimum: {
                        type: 'number',
                        multipleOf: 10,
                        title: messages[getMessageId('configSchemaMinimumTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                value: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                },
                maximum: {
                    'ui:widget': 'updown'
                },
                minimum: {
                    'ui:widget': 'updown'
                }
            },
            formData: {
                name: '',
                code: '',
                value: '',
                maximum: '',
                minimum: '',
                description: '',
                dataSource: '',
                server: '',
                cascade: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        slider: {
            icon: '&#xe794;',
            label: messages[getMessageId('fieldSchemaSliderLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                value: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: '',
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        },
        sliderRange: {
            icon: '&#xe794;',
            label: messages[getMessageId('fieldSchemaSliderRangeLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                description: '',
                dataSource: '',
                server: '',
                cascade: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        radio: {
            icon: '&#xe671;',
            label: messages[getMessageId('configSchemaRadioLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: true,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')],
                        enum: [],
                        enumNames: []
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                value: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: '',
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        },
        checkbox: {
            icon: '&#xe6ce;',
            label: messages[getMessageId('configSchemaCheckboxLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: true,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')],
                        enum: [],
                        enumNames: []
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                value: {
                    'ui:widget': 'multiSelect',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: [],
                description: '',
                dataSource: '',
                server: '',
                require: false,
                disabled: false
            }
        },
        booleanCheckbox: {
            icon: '&#xe6ce;',
            label: messages[getMessageId('configSchemaBoolCheckboxLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaBooleanCheckboxValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: false,
                description: '',
                dataSource: '',
                server: '',
                hidden: false,
                disabled: false
            }
        },
        booleanSwitch: {
            icon: '&#xe685;',
            label: messages[getMessageId('fieldSchemaBoolSwitchLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaBooleanCheckboxValueTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: false,
                description: '',
                dataSource: '',
                server: '',
                hidden: false,
                disabled: false
            }
        },
        upload: {
            icon: '&#xe616;',
            label: messages[getMessageId('configSchemaUploadLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    uploadType: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaUploadTypeTitle')],
                        enum: ['picture', 'picture-inline', 'picture-card'],
                        enumNames: [messages[getMessageId('configSchemaUploadTypeOption1')], messages[getMessageId('configSchemaUploadTypeOption2')], messages[getMessageId('configSchemaUploadTypeOption3')]]
                    },
                    maxFileSize: {
                        type: 'number',
                        minimum: 0,
                        multipleOf: 5,
                        title: messages[getMessageId('configSchemaUploadMaxSizeTitle')]
                    },
                    maxFileNum: {
                        type: 'number',
                        minimum: 0,
                        multipleOf: 1,
                        title: messages[getMessageId('configSchemaUploadMaxNumTitle')]
                    },
                    exampleImageUrl: {
                        type: 'array',
                        title: messages[getMessageId('configSchemaUploadExamplePicUrlTitle')],
                        maxFileNum: 1,
                        items: {
                            type: 'string',
                            format: 'data-url'
                        }
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                },
                uploadType: {
                    'ui:widget': 'select'
                },
                maxFileSize: {
                    'ui:widget': 'updown'
                },
                maxFileNum: {
                    'ui:widget': 'updown'
                },
                exampleImageUrl: {
                    'ui:options': {
                        label: '上传',
                        listType: 'picture',
                        vertical: true,
                        accept: 'image/*'
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                description: '',
                dataSource: '',
                server: '',
                uploadType: 'picture',
                maxFileSize: 10,
                maxFileNum: 10,
                exampleImageUrl: [],
                require: false,
                disabled: false
            }
        },
        file: {
            icon: '&#xe664;',
            label: messages[getMessageId('configSchemaFileUploadLabel')],
            platform: ['laptop'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    maxFileSize: {
                        type: 'number',
                        minimum: 0,
                        multipleOf: 5,
                        title: messages[getMessageId('configSchemaUploadMaxSizeTitle')]
                    },
                    maxFileNum: {
                        type: 'number',
                        minimum: 0,
                        multipleOf: 1,
                        title: messages[getMessageId('configSchemaUploadMaxNumTitle')]
                    },
                    templateFileUrl: {
                        type: 'array',
                        title: messages[getMessageId('configSchemaUploadTemplateFileUrlTitle')],
                        maxFileNum: 1,
                        items: {
                            type: 'string',
                            format: 'data-url'
                        }
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                },
                maxFileSize: {
                    'ui:widget': 'updown'
                },
                maxFileNum: {
                    'ui:widget': 'updown'
                },
                templateFileUrl: {
                    'ui:options': {
                        label: '上传',
                        vertical: true
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                description: '',
                dataSource: '',
                server: '',
                maxFileSize: 10,
                maxFileNum: 10,
                require: false,
                templateFileUrl: [],
                disabled: false
            }
        },
        select: {
            icon: '&#xe6ce;',
            label: messages[getMessageId('configSchemaSelectLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: true,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')],
                        enum: [],
                        enumNames: []
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                value: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                value: '',
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        },
        suggestSelect: {
            icon: '&#xe6fb;',
            label: messages[getMessageId('configSchemaSuggestSelectLabel')],
            platform: ['laptop'],
            hasItemSetting: true,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')],
                        enum: [],
                        enumNames: []
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                value: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')]
                    }
                },
                description: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                value: '',
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        },
        multiSelect: {
            icon: '&#xe6fc;',
            label: messages[getMessageId('configSchemaMultiSelectLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: true,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')],
                        enum: [],
                        enumNames: []
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                value: {
                    'ui:widget': 'multiSelect',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                value: [],
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        },
        cascaderSelect: {
            icon: '&#xe7df;',
            label: messages[getMessageId('fieldSchemaCascaderSelectLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: true,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        },
        treeSelect: {
            icon: '&#xe681;',
            label: messages[getMessageId('configSchemaTreeSelectLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    selectLeafOnly: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaSelectLeafOnlyTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                description: '',
                dataSource: '',
                server: '',
                selectLeafOnly: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        multiTreeSelect: {
            icon: '&#xe6f8;',
            label: messages[getMessageId('configSchemaMultiTreeSelectLabel')],
            platform: ['laptop'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    selectLeafOnly: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaSelectLeafOnlyTitle')]
                    },
                    treeCheckStrictly: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaTreeCheckStrictlyTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                description: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                description: '',
                dataSource: '',
                server: '',
                selectLeafOnly: false,
                treeCheckStrictly: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        date: {
            icon: '&#xe629;',
            label: messages[getMessageId('configSchemaDateLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                description: '',
                dataSource: '',
                server: '',
                cascade: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        dateRange: {
            icon: '&#xe629;',
            label: messages[getMessageId('configSchemaDateRangeLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    initRange: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaInitRangeTitle')],
                        enum: ['beforeweek', 'beforemonth', 'beforeyear', 'afterweek', 'aftermonth', 'afteryear'],
                        enumNames: [messages[getMessageId('configSchemaInitRangeOption1')], messages[getMessageId('configSchemaInitRangeOption2')], messages[getMessageId('configSchemaInitRangeOption3')], messages[getMessageId('configSchemaInitRangeOption4')], messages[getMessageId('configSchemaInitRangeOption5')], messages[getMessageId('configSchemaInitRangeOption6')]]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                initRange: {
                    'ui:widget': 'select'
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                description: '',
                initRange: undefined,
                dataSource: '',
                server: '',
                cascade: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        datetime: {
            icon: '&#xe62e;',
            label: messages[getMessageId('configSchemaDateTimeLabel')],
            platform: ['laptop', 'mobile'],
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    placeholder: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaPlaceholderTitle')]
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    cascade: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaCascadeTitle')]
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                placeholder: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                placeholder: messages[getMessageId('fieldSchemaCommonSelectPlaceholder')],
                description: '',
                dataSource: '',
                server: '',
                cascade: false,
                require: false,
                hidden: false,
                disabled: false
            }
        },
        rate: {
            icon: '&#xe648;',
            label: messages[getMessageId('configSchemaRateLabel')],
            platform: ['laptop'],
            hasItemSetting: true,
            hasShowConfigButton: true,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    },
                    value: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaValueTitle')],
                        enum: [],
                        enumNames: []
                    },
                    description: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDescTitle')]
                    },
                    dataSource: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaDataSourceTitle')],
                        enum: [],
                        enumNames: []
                    },
                    server: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaServerCodeTitle')],
                        enum: [],
                        enumNames: []
                    },
                    require: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaRequiredTitle')]
                    },
                    hidden: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaHiddenTitle')]
                    },
                    disabled: {
                        type: 'boolean',
                        title: messages[getMessageId('configSchemaDisabledTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                },
                value: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaSelectValuePlaceholder')]
                    }
                },
                description: {
                    'ui:widget': 'richtext',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDescPlaceholder')],
                        height: 200,
                        toolbars: [
                            ['bold', 'italic', 'underline', 'strike', { color: [] }, 'link', 'image', 'clean']
                        ]
                    }
                },
                dataSource: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                    }
                },
                server: {
                    'ui:widget': 'select',
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                    }
                }
            },
            formData: {
                name: '',
                code: '',
                value: '',
                description: '',
                dataSource: '',
                server: '',
                require: false,
                hidden: false,
                disabled: false
            }
        }
    };

    if (supportList && supportList.length > 0) {
        let filterSchema = {};
        supportList.map((support) => {
            filterSchema[support] = configSchema[support];
        });
        return addCustomRegisterFields(filterSchema, registerWidgets, messages);
    } else {
        return addCustomRegisterFields(configSchema, registerWidgets, messages);
    }
};

const addCustomRegisterFields = (configSchema, registerWidgets, messages) => {
    const configFieldsDetail = {
        placeholder: {
            jsonSchema: {
                type: 'string',
                title: messages[getMessageId('configSchemaPlaceholderTitle')]
            },
            uiSchema: {
                'ui:options': {
                    placeholder: messages[getMessageId('configSchemaPlaceholderPlaceholder')]
                }
            },
            formData: ''
        },
        value: {
            jsonSchema: {
                type: 'string',
                title: messages[getMessageId('configSchemaValueTitle')]
            },
            uiSchema: {
                'ui:options': {
                    placeholder: messages[getMessageId('configSchemaValuePlaceholder')]
                }
            },
            formData: ''
        },
        description: {
            jsonSchema: {
                type: 'string',
                title: messages[getMessageId('configSchemaDescTitle')]
            },
            uiSchema: {
                'ui:options': {
                    placeholder: messages[getMessageId('configSchemaDescPlaceholder')]
                }
            },
            formData: ''
        },
        validate: {
            jsonSchema: {
                type: 'string',
                title: messages[getMessageId('configSchemaValidateTitle')],
                enum: ['', 'email', 'url', 'telephone', 'id', 'digit', 'money'],
                enumNames: [
                    messages[getMessageId('configSchemaValidateOption1')],
                    messages[getMessageId('configSchemaValidateOption2')],
                    messages[getMessageId('configSchemaValidateOption3')],
                    messages[getMessageId('configSchemaValidateOption4')],
                    messages[getMessageId('configSchemaValidateOption5')],
                    messages[getMessageId('configSchemaValidateOption6')],
                    messages[getMessageId('configSchemaValidateOption7')]
                ]
            },
            uiSchema: {
                'ui:widget': 'select',
                'ui:options': {
                    placeholder: messages[getMessageId('configSchemaValidatePlaceholder')]
                }
            },
            formData: ''
        },
        server: {
            jsonSchema: {
                type: 'string',
                title: messages[getMessageId('configSchemaServerCodeTitle')],
                enum: [],
                enumNames: []
            },
            uiSchema: {
                'ui:widget': 'select',
                'ui:options': {
                    placeholder: messages[getMessageId('configSchemaServerCodePlaceholder')]
                }
            },
            formData: ''
        },
        require: {
            jsonSchema: {
                type: 'boolean',
                title: messages[getMessageId('configSchemaRequiredTitle')]
            },
            formData: false
        },
        hidden: {
            jsonSchema: {
                type: 'boolean',
                title: messages[getMessageId('configSchemaHiddenTitle')]
            },
            formData: false
        },
        cascade: {
            jsonSchema: {
                type: 'boolean',
                title: messages[getMessageId('configSchemaCascadeTitle')]
            },
            formData: false
        },
        dataSource: {
            jsonSchema: {
                type: 'string',
                title: messages[getMessageId('configSchemaDataSourceTitle')],
                enum: [],
                enumNames: []
            },
            uiSchema: {
                'ui:widget': 'select',
                'ui:options': {
                    placeholder: messages[getMessageId('configSchemaDataSourcePlaceholder')]
                }
            },
            formData: ''
        }
    };
    registerWidgets.map((widget) => {
        let widgetConfigSchema = {
            icon: widget.icon,
            label: widget.label,
            platform: widget.platform || ['laptop'], // 自定义字段默认只支持PC，可以在registerWidget里面指定
            hasItemSetting: false,
            hasShowConfigButton: false,
            jsonSchema: {
                title: '',
                type: 'object',
                required: ['name', 'code'],
                properties: {
                    name: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaNameTitle')],
                        maxLength: 200
                    },
                    code: {
                        type: 'string',
                        title: messages[getMessageId('configSchemaCodeTitle')]
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaNamePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaNameRequire')]
                        }]
                    }
                },
                code: {
                    'ui:options': {
                        placeholder: messages[getMessageId('configSchemaCodePlaceholder')],
                        validate: [{
                            type: 'empty',
                            message: messages[getMessageId('configSchemaCodeRequire')]
                        }]
                    }
                }
            },
            formData: {
                name: '',
                code: ''
            }
        };
        const configFields = widget.configFields || [];
        const customConfigFields = widget.customConfigFields || [];
        configFields.map((field) => {
            widgetConfigSchema.jsonSchema.properties[field] = configFieldsDetail[field].jsonSchema;
            if (typeof configFieldsDetail[field].uiSchema !== 'undefined') {
                widgetConfigSchema.uiSchema[field] = configFieldsDetail[field].uiSchema;
            }
            widgetConfigSchema.formData[field] = configFieldsDetail[field].formData;
        });
        customConfigFields.map((fieldObject) => {
            widgetConfigSchema.jsonSchema.properties[fieldObject.code] = fieldObject.schema.jsonSchema;
            if (typeof fieldObject.schema.uiSchema !== 'undefined') {
                widgetConfigSchema.uiSchema[fieldObject.code] = fieldObject.schema.uiSchema;
            }
            widgetConfigSchema.formData[fieldObject.code] = fieldObject.schema.formData;
        });
        configSchema[widget.type] = widgetConfigSchema;
    });
    return configSchema;
};

export default {
    getDefaultConfig: (messages, registerWidgets, supportList) => {
        return getIntlConfigSchema(messages, registerWidgets, supportList);
    },
    getConfig: (dataSourceList, serverCodeList, messages, registerWidgets, supportList) => {
        let configSchema = getIntlConfigSchema(messages, registerWidgets, supportList);
        Object.keys(configSchema).map((type) => {
            if (typeof configSchema[type].jsonSchema.properties.dataSource !== 'undefined') {
                configSchema[type].jsonSchema.properties.dataSource.data = dataSourceList;
            }
            if (typeof configSchema[type].jsonSchema.properties.server !== 'undefined') {
                configSchema[type].jsonSchema.properties.server.data = serverCodeList;
            }
        });
        return configSchema;
    }
};
