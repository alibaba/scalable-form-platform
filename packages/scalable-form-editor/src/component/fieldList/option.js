/**
 * 表单字段预览列表项
 * @props: editFieldCode（编辑中的字段code） draggable（字段是否可以拖拽）
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {If, Then, Else} from 'react-if';
import XForm from 'scalable-form-antd';
import {Tag} from 'antd';
import {DragSource, DropTarget} from 'react-dnd';
import {util} from '../../common/util';
import {getMessageId} from '../../i18n/localeMessages';
import * as CONST from '../../common/const';

const ItemTypeField = CONST.DragDropItemTypes.field;
const ItemTypePicker = CONST.DragDropItemTypes.picker;

const fieldDragSource = {
    beginDrag(props) {
        return {
            index: props.index
        };
    },

    canDrag(props) {
        return props.draggable
    }
};

const fieldDragConnect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const fieldDropTarget = {
    drop(props, monitor, component) {
        const dragType = monitor.getItemType();
        const hoverIndex = props.index;
        switch (dragType) {
            case ItemTypeField:
                // 字段自身拖拽排序
                const dragIndex = monitor.getItem().index;

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
                props.fieldMoveHandler(dragIndex, hoverIndex);
                monitor.getItem().index = hoverIndex;
                break;
            case ItemTypePicker:
                // 拖拽添加新的字段
                const field = monitor.getItem().field;
                props.addFieldHandler(field, hoverIndex);
                break;
            default:
                console.warn('fieldListOption的dropTarget发现不能识别的dragSource ItemType');
        }

    },
    canDrop(props, monitor) {
        // 只有非系统字段才能drop
        return props.fieldData.fieldType !== 'system';
    }
};

const fieldDropConnect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};

class FieldListOption extends PureComponent {
    static propTypes = {
        globalConfig: PropTypes.shape({
            codeEditable: PropTypes.bool.isRequired,
            fieldPreviewable: PropTypes.bool.isRequired
        }).isRequired,
        draggable: PropTypes.bool.isRequired,
        platformSupport: PropTypes.bool.isRequired,
        fieldTypeLabel: PropTypes.string.isRequired,
        messages: PropTypes.object.isRequired,
        systemFieldEditable: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        fieldListClickHandler: PropTypes.func.isRequired,
        deleteFieldHandler: PropTypes.func.isRequired,
        fieldData: PropTypes.object.isRequired,
        fieldMoveHandler: PropTypes.func.isRequired,
        addFieldHandler: PropTypes.func.isRequired
    };

    render() {
        const {index, globalConfig, platformSupport, fieldTypeLabel, messages, systemFieldEditable, fieldData, editFieldCode, customInterfaces, customGateway, customUploadRequest, onImagePreview, locale, fieldListClickHandler, deleteFieldHandler, isDragging, isOver, connectDragSource, connectDropTarget, registerWidgets} = this.props;

        const opacity = (isDragging || isOver) ? 0.2 : 1;
        const marginTop = isOver ? 10 : 0;
        const xformCustomWidgets = util.getXFormCustomWidgets(registerWidgets);
        let listItem = '';
        let jsonSchema = {
            title: '',
            type: 'object',
            properties: fieldData.jsonSchema
        };
        switch (fieldData.fieldType) {
            case 'system':
                listItem = (
                    <li
                        style={{
                            opacity: 1,
                            marginTop: 0
                        }}
                        key={fieldData.code}
                        data-code={fieldData.code}
                        className={classnames({
                            'preview-list-item': true,
                            current: fieldData.code === editFieldCode,
                            [fieldData.fieldType]: true
                        })}
                        onClick={fieldListClickHandler}
                    >
                        <div className="list-item-wrapper">
                            <div className="list-item-header">
                                <span className="field-type-label">{fieldTypeLabel}</span>
                                <span className="field-label">{fieldData.label}</span>
                            </div>
                            {(() => {
                                if (globalConfig.fieldPreviewable && fieldData.code === editFieldCode) {
                                    if (platformSupport) {
                                        return <div className="field-preview">
                                            <XForm
                                                customInterfaces={customInterfaces}
                                                customGateway={customGateway}
                                                customUploadRequest={customUploadRequest}
                                                onImagePreview={onImagePreview}
                                                locale={locale}
                                                alignType="vertical"
                                                noLabel
                                                registerWidgets={xformCustomWidgets}
                                                formItemLayout={{
                                                    labelCol: {span: 0},
                                                    wrapperCol: {span: 24}
                                                }}
                                                jsonSchema={jsonSchema}
                                                uiSchema={fieldData.uiSchema}
                                                formData={fieldData.formData}
                                                bizData={fieldData.bizData}
                                            />
                                        </div>
                                    } else {
                                        return (
                                            <div className="not-support-tip">
                                                <Tag color="#f50">{messages[getMessageId('fieldNotSupportTip')]}</Tag>
                                            </div>
                                        );
                                    }
                                } else {
                                    return null;
                                }
                            })()}
                            {systemFieldEditable && <i
                                type="delete"
                                className="xform-icon delete-icon"
                                data-code={fieldData.code}
                                onClick={deleteFieldHandler}
                            >&#xe600;</i>}
                        </div>
                    </li>
                );
                break;
            case 'common':
            case 'custom':
                listItem = (
                    <li
                        style={{
                            opacity: opacity,
                            marginTop: marginTop
                        }}
                        key={fieldData.code}
                        data-code={fieldData.code}
                        className={classnames({
                            'preview-list-item': true,
                            current: fieldData.code === editFieldCode,
                            [fieldData.fieldType]: true
                        })}
                        onClick={fieldListClickHandler}
                    >
                        <div className="list-item-wrapper">
                            <div className="field-index-number">{index + 1}</div>
                            <div className="list-item-header">
                                <span className="field-type-label">{fieldTypeLabel}</span>
                                <span className="field-label">{fieldData.label}</span>
                            </div>
                            {(() => {
                                if (globalConfig.fieldPreviewable && fieldData.code === editFieldCode) {
                                    if (platformSupport) {
                                        return <div className="field-preview">
                                            <XForm
                                                customInterfaces={customInterfaces}
                                                customGateway={customGateway}
                                                customUploadRequest={customUploadRequest}
                                                onImagePreview={onImagePreview}
                                                locale={locale}
                                                alignType="vertical"
                                                noLabel
                                                registerWidgets={xformCustomWidgets}
                                                formItemLayout={{
                                                    labelCol: {span: 0},
                                                    wrapperCol: {span: 24}
                                                }}
                                                jsonSchema={jsonSchema}
                                                uiSchema={fieldData.uiSchema}
                                                formData={fieldData.formData}
                                                bizData={fieldData.bizData}
                                            />
                                        </div>
                                    } else {
                                        return (
                                            <div className="not-support-tip">
                                                <Tag color="#f50">{messages[getMessageId('fieldNotSupportTip')]}</Tag>
                                            </div>
                                        );
                                    }
                                } else {
                                    return null;
                                }
                            })()}
                            <i
                                type="delete"
                                data-code={fieldData.code}
                                className="xform-iconfont delete-icon"
                                onClick={deleteFieldHandler}
                            >&#xe600;</i>
                        </div>
                    </li>
                );
                break;

            default:
                console.warn('接口返回了一种不能识别的字段类型');
        }
        return connectDragSource(connectDropTarget(listItem));
    }
}

export default DropTarget([ItemTypeField, ItemTypePicker], fieldDropTarget, fieldDropConnect)(DragSource(ItemTypeField, fieldDragSource, fieldDragConnect)(FieldListOption));
