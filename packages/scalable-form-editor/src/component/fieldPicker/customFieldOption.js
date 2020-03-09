/**
 * 添加自定义字段项，要注入拖拽逻辑
 * @props: field（字段描述数据） addCustomFieldHandler（添加自定义字段处理器） generateFieldData（从field Object生成预览字段列表所需的数据格式）

 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import * as CONST from '../../common/const';

const customPickerDragSource = {
    beginDrag(props) {
        const generateFieldData = props.generateFieldData;
        return {
            field: generateFieldData(props.field.type)
        };
    }
};

const customPickerDragConnect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

class CustomFieldOption extends PureComponent {
    static propTypes = {
        field: PropTypes.object.isRequired,
        addCustomFieldHandler: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        generateFieldData: PropTypes.func.isRequired
    };

    render() {
        const {field, addCustomFieldHandler, connectDragSource, index} = this.props;
        return connectDragSource(
            <div
                className="list-item"
                data-type={field.type}
                onClick={addCustomFieldHandler}
            >
                <i className="xform-iconfont template-icon" dangerouslySetInnerHTML={{__html: field.icon}} />
                <span className="template-label" title={field.label}>{field.label}</span>
            </div>
        );
    }

}

export default DragSource(CONST.DragDropItemTypes.picker, customPickerDragSource, customPickerDragConnect)(CustomFieldOption);
