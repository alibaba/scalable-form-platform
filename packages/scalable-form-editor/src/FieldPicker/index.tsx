import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Platform, WidgetKey } from 'scalable-form-tools';
import PickerItem from '../schema/PickerItem';
import { DropField } from '../utils/Config';
import { isPickerItemInPlatform } from '../utils/Tool';
import './index.less';

interface Props {
  /**
   * 选择器列表
   */
  pickerList: PickerItem[];
  /**
   * 当前平台
   */
  platform: Platform;
  /**
   * 新增widget
   * @param {WidgetKey} widgetName
   */
  onInsertWidget: (widgetName: WidgetKey) => void;
}

export default function FieldPicker(props: Props) {
  const { pickerList } = props;
  const filterPickerList = pickerList.filter((picker: PickerItem) => {
    return isPickerItemInPlatform(picker, props.platform);
  });
  return (
    <Droppable droppableId={DropField.PICKER} isDropDisabled>
      {(provided) => (
        <div className="template-list" ref={provided.innerRef}>
          {filterPickerList.map((picker: PickerItem, index: number) => {
            return (
              <Draggable
                key={`${DropField.PICKER}_${picker.key}`}
                draggableId={`${DropField.PICKER}_${picker.key}`}
                index={index}
              >
                {(dragProvided, innerSnapshot) => {
                  let style = {};
                  if (innerSnapshot.isDragging) {
                    style = {
                      ...dragProvided.draggableProps.style,
                      background: '#fff',
                    };
                  }
                  return (
                    <React.Fragment>
                      <div
                        key={picker.key}
                        className="template-type"
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={style}
                        onClick={() => {
                          props.onInsertWidget(picker.key);
                        }}
                      >
                        <div className="list-item">
                          <i
                            className="xform-iconfont template-icon"
                            dangerouslySetInnerHTML={{ __html: picker.icon }}
                          />
                          <span className="template-label" title={picker.label}>
                            {picker.label}
                          </span>
                        </div>
                      </div>
                      {innerSnapshot.isDragging ? (
                        <div key={`${picker.key}-clone`} className="template-type" style={{}}>
                          <div className="list-item">
                            <i
                              className="xform-iconfont template-icon"
                              dangerouslySetInnerHTML={{ __html: picker.icon }}
                            />
                            <span className="template-label" title={picker.label}>
                              {picker.label}
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                }}
              </Draggable>
            );
          })}
        </div>
      )}
    </Droppable>
  );
}
