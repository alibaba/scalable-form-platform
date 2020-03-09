/**
 * 通用字段列表项，要注入拖拽逻辑
 * @props: field（字段描述数据） addCommonFieldHandler（添加通用字段处理器） generateFieldData（从field Object生成预览字段列表所需的数据格式）
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import * as CONST from '../../common/const';

const commonPickerDragSource = {
    beginDrag(props) {
        const generateFieldData = props.generateFieldData;
        return {
            field: generateFieldData(props.field.code)
        };
    }
};

const commonPickerDragConnect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

class CommonFieldOption extends PureComponent {
    static propTypes = {
        field: PropTypes.object.isRequired,
        addCommonFieldHandler: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        generateFieldData: PropTypes.func.isRequired
    };

    render() {
        const {field, addCommonFieldHandler, connectDragSource} = this.props;
        return connectDragSource(
            <div
                className="list-item"
                data-code={field.code}
                onClick={addCommonFieldHandler}
            >
                <span
                    className="template-label"
                    title={field.label}
                >{field.label}</span>
            </div>
        );
    }

}

export default DragSource(CONST.DragDropItemTypes.picker, commonPickerDragSource, commonPickerDragConnect)(CommonFieldOption);
