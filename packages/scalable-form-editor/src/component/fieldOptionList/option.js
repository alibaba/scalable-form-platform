/**
 * 字段选项组件（可拖拽）
 * @props: xformOptionBizData(字段选项业务属性)
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import XForm from 'scalable-form-antd';
import {DragSource, DropTarget} from 'react-dnd';
import {util} from '../../common/util';
import {messages, getMessageId} from '../../i18n/localeMessages';
import * as CONST from '../../common/const';

const ItemType = CONST.DragDropItemTypes.option;
const optionDragSource = {
    beginDrag(props) {
        return {
            index: props.index
        };
    }
};

const optionDragConnect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const optionDropTarget = {
    drop(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // 未拖拽出自身区域不做处理
        if (dragIndex === hoverIndex) {
            return;
        }

        // 获取拖拽的component的高，只有当向上（向下）拖拽超出50%时，才触发hover位置的改变
        const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.height) / 2;
        const initialClientOffset = monitor.getInitialClientOffset();
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - initialClientOffset.y;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // 触发
        props.itemMoveHandler(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};

const optionDropConnect = (connect, monitor) => {
    return {
        isOver: monitor.isOver(),
        connectDropTarget: connect.dropTarget()
    };
};

class FieldOptionListOption extends PureComponent {
    static propTypes = {
        globalConfig: PropTypes.shape({
            codeEditable: PropTypes.bool.isRequired,
            fieldPreviewable: PropTypes.bool.isRequired
        }).isRequired,
        messages: PropTypes.object.isRequired,
        itemData: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        unfoldIndex: PropTypes.number.isRequired,
        xformOptionBizData: PropTypes.array.isRequired,
        deleteListItemHandler: PropTypes.func.isRequired,
        listItemUpdateHandler: PropTypes.func.isRequired,
        itemListFoldChangeHandler: PropTypes.func.isRequired,
        itemMoveHandler: PropTypes.func.isRequired
    };

    render() {
        const item = this.props.itemData;
        const {globalConfig, messages, unfoldIndex, customInterfaces, customGateway, customUploadRequest, onImagePreview, locale, index, xformOptionBizData, deleteListItemHandler, listItemUpdateHandler, itemListFoldChangeHandler, isDragging, isOver, connectDragSource, connectDropTarget, registerWidgets} = this.props;
        const opacity = (isDragging || isOver) ? 0.2 : 1;
        const marginTop = isOver ? 10 : 0;
        const xformCustomWidgets = util.getXFormCustomWidgets(registerWidgets);
        // 选项业务属性配置的schema
        let optionBizDataJsonSchema, optionBizDataUISchema, optionBizDataCodes = [];
        xformOptionBizData.map((item) => {
            optionBizDataCodes.push(item.code);
            optionBizDataJsonSchema = Object.assign({}, optionBizDataJsonSchema, item.jsonSchema);
            optionBizDataUISchema = Object.assign({}, optionBizDataUISchema, item.uiSchema);
        });

        let codeUiSchema = {
            'ui:options': {
                placeholder: messages[getMessageId('optionListCodePlaceholder')],
                validate: [{
                    type: 'empty',
                    message: messages[getMessageId('optionListCodeRequire')]
                }]
            }
        };

        // 配置了Code模式才能展示编码字段
        if (!globalConfig.codeEditable) {
            codeUiSchema['ui:widget'] = 'hidden';
        }

        return connectDragSource(connectDropTarget((
            <li
                style={{
                    opacity: opacity,
                    marginTop: marginTop
                }}
                data-code={item.code}
                className={classnames({
                    'field-option-list-item': true,
                    fold: unfoldIndex !== index
                })}
            >
                <div className="list-item-header-bar">
                    <i className="xform-iconfont sort-icon">&#xe786;</i>
                    <span className="item-title">{messages[getMessageId('optionNameLabel')] + (index + 1)}</span>
                    <div className="icon-wrapper">
                        <i
                            className="xform-iconfont delete-icon"
                            data-index={index}
                            onClick={deleteListItemHandler}
                        >&#xe7c3;</i>
                        <i
                            className="xform-iconfont fold-icon"
                            data-index={index}
                            onClick={itemListFoldChangeHandler}
                        >&#xe610;</i>
                    </div>
                </div>
                <div className="list-item-wrapper">
                    <XForm
                        customInterfaces={customInterfaces}
                        customGateway={customGateway}
                        customUploadRequest={customUploadRequest}
                        onImagePreview={onImagePreview}
                        locale={locale}
                        labelType="vertical"
                        alignType="vertical"
                        registerWidgets={xformCustomWidgets}
                        jsonSchema={{
                            title: '',
                            type: 'object',
                            required: ['name', 'code'],
                            properties: Object.assign({}, optionBizDataJsonSchema, {
                                name: {
                                    type: 'string',
                                    title: messages[getMessageId('optionListNameLabel')],
                                    maxLength: 200
                                },
                                code: {
                                    type: 'string',
                                    title: messages[getMessageId('optionListCodeLabel')]
                                }
                            })
                        }}
                        uiSchema={Object.assign({}, optionBizDataUISchema, {
                            name: {
                                'ui:options': {
                                    placeholder: messages[getMessageId('optionListNamePlaceholder')],
                                    validate: [{
                                        type: 'empty',
                                        message: messages[getMessageId('optionListNameRequire')]
                                    }]
                                }
                            },
                            code: codeUiSchema
                        })}
                        formData={item}
                        bizData={{
                            index: index
                        }}
                        sequence={['name', 'code'].concat(optionBizDataCodes)}
                        onChange={(formData, bizData) => {
                            listItemUpdateHandler(formData, bizData);
                        }}
                    />
                </div>
            </li>
        )));
    }
}

export default DropTarget(ItemType, optionDropTarget, optionDropConnect)(DragSource(ItemType, optionDragSource, optionDragConnect)(FieldOptionListOption));
