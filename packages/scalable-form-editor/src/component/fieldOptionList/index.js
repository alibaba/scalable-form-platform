/**
 * 字段选项配置列表
 * @props: editFieldData（编辑中的字段数据） xformOptionBizData（字段业务属性配置数据） updateFieldDataHandler（更新编辑过的editFieldData处理器）
 * @states: unfoldIndex（展开的选项）
 */

import './index.less';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';

import {getMessageId} from '../../i18n/localeMessages';
import FieldOption from './option';
import {util} from '../../common/util';
import * as CONST from '../../common/const';

class FieldOptionList extends PureComponent {
    static propTypes = {
        globalConfig: PropTypes.shape({
            codeEditable: PropTypes.bool.isRequired,
            fieldPreviewable: PropTypes.bool.isRequired
        }).isRequired,
        messages: PropTypes.object.isRequired,
        editFieldData: PropTypes.object.isRequired,
        xformOptionBizData: PropTypes.array.isRequired,
        updateFieldDataHandler: PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);
        this.handleAddListItem = this.handleAddListItem.bind(this);
        this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
        this.handleListItemUpdate = this.handleListItemUpdate.bind(this);
        this.handleItemListFoldChange = this.handleItemListFoldChange.bind(this);
        this.handleItemMove = this.handleItemMove.bind(this);
        this.state = {
            unfoldIndex: 0
        };
    }

    componentWillUnmount() {
        console.log('index component unmount');
    }

    // 下拉框添加选项操作，并默认展开新添加的选项
    handleAddListItem() {
        const xformOptionBizData = this.props.xformOptionBizData;
        const messages = this.props.messages;
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let fieldData = Object.assign({}, editFieldData);
        let index, optionBizData = {};
        let optionFieldCode = util.getRandomString(9);
        if (fieldData.jsonSchema[code].type === 'array') {
            index = fieldData.jsonSchema[code].items.enum.length;
            fieldData.jsonSchema[code].items.enum.push(optionFieldCode);
            fieldData.jsonSchema[code].items.enumNames.push(messages[getMessageId('optionListCommonEnumName')]);
        } else {
            index = fieldData.jsonSchema[code].enum.length;
            fieldData.jsonSchema[code].enum.push(optionFieldCode);
            fieldData.jsonSchema[code].enumNames.push(messages[getMessageId('optionListCommonEnumName')]);
        }
        this.setState({
            unfoldIndex: index
        });
        xformOptionBizData.map((item) => {
            optionBizData = Object.assign({}, optionBizData, item.formData);
        });
        // 添加选项的业务属性
        if (typeof fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] !== 'undefined') {
            fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][optionFieldCode] = optionBizData;
        } else {
            fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] = {};
            fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][optionFieldCode] = optionBizData;
        }
        this.props.updateFieldDataHandler(code, fieldData);
    }

    // 下拉框删除选项操作
    handleDeleteListItem(event) {
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let fieldData = Object.assign({}, editFieldData);
        let index = event.currentTarget.getAttribute('data-index');
        let deletedOptionFieldCode;
        if (fieldData.jsonSchema[code].type === 'array') {
            deletedOptionFieldCode = fieldData.jsonSchema[code].items.enum[index];
            fieldData.jsonSchema[code].items.enum.splice(index, 1);
            fieldData.jsonSchema[code].items.enumNames.splice(index, 1);
        } else {
            deletedOptionFieldCode = fieldData.jsonSchema[code].enum[index];
            fieldData.jsonSchema[code].enum.splice(index, 1);
            fieldData.jsonSchema[code].enumNames.splice(index, 1);
        }
        // 更新fieldData中的选项业务属性（删除掉删除了的选项code值对应的业务属性）
        if (typeof fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] !== 'undefined') {
            delete fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][deletedOptionFieldCode];
        }
        this.props.updateFieldDataHandler(code, fieldData);
    }

    // 下拉框名称、编码更新操作
    handleListItemUpdate(formData, bizData) {
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let fieldData = Object.assign({}, editFieldData);
        const index = bizData.index;
        let originalOptionFieldCode;
        // 替换enum和enumNames中的相应项为formData中的数据
        if (fieldData.jsonSchema[code].type === 'array') {
            originalOptionFieldCode = fieldData.jsonSchema[code].items.enum[index];
            fieldData.jsonSchema[code].items.enum.splice(index, 1, formData.code);
            fieldData.jsonSchema[code].items.enumNames.splice(index, 1, formData.name);
        } else {
            originalOptionFieldCode = fieldData.jsonSchema[code].enum[index];
            fieldData.jsonSchema[code].enum.splice(index, 1, formData.code);
            fieldData.jsonSchema[code].enumNames.splice(index, 1, formData.name);
        }
        // 更新fieldData中的选项业务属性(如果字段属性code变化，还要删除掉对应code的业务属性并重新添加)
        if (typeof fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] !== 'undefined') {
            delete fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][originalOptionFieldCode];
            fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][formData.code] = formData;
            this.props.updateFieldDataHandler(code, fieldData);
        } else {
            fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] = {
                [formData.code]: formData
            };
            this.props.updateFieldDataHandler(code, fieldData);
        }
    }

    // 下拉框选项设置展开
    handleItemListFoldChange(event) {
        const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);
        const currentIndex = this.state.unfoldIndex;
        let unfoldIndex;
        if (currentIndex === index) {
            unfoldIndex = -1;
        } else {
            unfoldIndex = index;
        }
        this.setState({
            unfoldIndex
        });
    }

    // 下拉框选项拖拽移动处理器
    handleItemMove(dragIndex, hoverIndex) {
        const editFieldData = this.props.editFieldData;
        const code = editFieldData.code;
        let fieldData = Object.assign({}, editFieldData);
        let editFieldJsonSchema;
        let movedEnum, movedEnumName;
        // 注意array类型的jsonSchema数据格式多一层"items"
        if (fieldData.jsonSchema[fieldData.code].type === 'array') {
            editFieldJsonSchema = fieldData.jsonSchema[fieldData.code].items;
        } else {
            editFieldJsonSchema = fieldData.jsonSchema[fieldData.code];
        }
        movedEnum = editFieldJsonSchema.enum[dragIndex];
        movedEnumName = editFieldJsonSchema.enumNames[dragIndex];
        editFieldJsonSchema.enum.splice(dragIndex, 1);
        editFieldJsonSchema.enum.splice(hoverIndex, 0, movedEnum);
        editFieldJsonSchema.enumNames.splice(dragIndex, 1);
        editFieldJsonSchema.enumNames.splice(hoverIndex, 0, movedEnumName);
        this.props.updateFieldDataHandler(code, fieldData);
        this.setState({
            unfoldIndex: hoverIndex
        });
    }


    render() {
        const {globalConfig, editFieldData, customInterfaces, customGateway, customUploadRequest, onImagePreview, locale, messages, xformOptionBizData, registerWidgets} = this.props;
        const {unfoldIndex} = this.state;
        let listItemData = [];
        let fieldEnumsData = [], fieldEnumNamesData = [];
        let index;
        let editFieldJsonSchema, optionBizData;
        // 注意array类型的jsonSchema数据格式多一层"items"
        if (editFieldData.jsonSchema[editFieldData.code].type === 'array') {
            editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code].items;
        } else {
            editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code];
        }
        if (typeof editFieldJsonSchema.enum !== 'undefined' &&
            typeof editFieldJsonSchema.enumNames !== 'undefined') {

            fieldEnumsData = editFieldJsonSchema.enum;
            fieldEnumNamesData = editFieldJsonSchema.enumNames;
        }
        optionBizData = editFieldData.bizData[editFieldData.code][CONST.XFORM_OPTION_BIZ_NAME];
        for (index = 0; index < fieldEnumsData.length; index++) {
            // 对于旧的schema数据，bizData里面没有options这个字段，则不处理optionBizData数据
            if (typeof optionBizData !== 'undefined') {
                listItemData.push(Object.assign({}, optionBizData[fieldEnumsData[index]], {
                    name: fieldEnumNamesData[index],
                    code: fieldEnumsData[index]
                }));
            } else {
                listItemData.push({
                    name: fieldEnumNamesData[index],
                    code: fieldEnumsData[index]
                });
            }

        }
        return (
            <div className="list-item-config">
                <ul className="list-item-config-panel">
                    {listItemData.map((item, index) => {
                        return (
                            <div key={item.index}>
                                <FieldOption
                                    globalConfig={globalConfig}
                                    messages={messages}
                                    registerWidgets={registerWidgets}
                                    itemData={item}
                                    index={index}
                                    unfoldIndex={unfoldIndex}
                                    customInterfaces={customInterfaces}
                                    customGateway={customGateway}
                                    customUploadRequest={customUploadRequest}
                                    onImagePreview={onImagePreview}
                                    locale={locale}
                                    xformOptionBizData={xformOptionBizData}
                                    deleteListItemHandler={this.handleDeleteListItem}
                                    listItemUpdateHandler={this.handleListItemUpdate}
                                    itemListFoldChangeHandler={this.handleItemListFoldChange}
                                    itemMoveHandler={this.handleItemMove}
                                />
                            </div>
                        );
                    })}
                </ul>
                <div className="list-item-config-bar">
                    <a
                        className="add-list-item"
                        href="javascript:;"
                        onClick={this.handleAddListItem}
                    >
                        <Icon className="link-icon" type="plus" />
                        {messages[getMessageId('optionListAddButton')]}
                    </a>
                </div>
            </div>
        );
    }
}

export default FieldOptionList;

