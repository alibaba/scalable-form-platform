/**
 * @file boolean 类型的 checkbox 组件
 * @description 默认值 false
 */

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxProps } from "antd/es/checkbox";
import { WidgetProps } from "scalable-form-core";
import { BaseFormContext } from "scalable-form-antd";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DropResult
} from "react-beautiful-dnd";
import "./index.less";
import { getRandomString } from "scalable-form-tools";

type BooleanCheckboxOptions = Pick<CheckboxProps, "checked" | "defaultChecked" | "indeterminate" | "autoFocus">;

type Option = {
  label: string;
  value: string;
};

type BooleanCheckboxProps = WidgetProps<Option[], BooleanCheckboxOptions, BaseFormContext>;

interface OptionItemProps {
  label: string;
  value: string;
  onChange: (newItem: { value: string, label: string }) => void;
  onRemove: () => void;
}

const OptionItem: React.FC<OptionItemProps> = (props: OptionItemProps) => {
  const [label, setLabel] = useState(props.label);
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setLabel(props.label);
  }, [props.label]);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const handleSubmit = useCallback(() => {
    props.onChange({
      value,
      label
    });
  }, [value, label]);
  return (
    <div className="option-item">
      <div className="option-item-label">
        <div className="title">
          编码
        </div>
        <div
          className="action"
          onClick={props.onRemove}
        >
          <CloseOutlined/>
        </div>
      </div>
      <div className="option-item-value">
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={handleSubmit}
        />
      </div>
      <div className="option-item-label">
        名称
      </div>
      <div className="option-item-value">
        <Input
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          onBlur={handleSubmit}
        />
      </div>
    </div>
  );
};
const OptionEditorWidget: React.FC<BooleanCheckboxProps> = (props) => {
  const { label, options, disabled, value = [], onChange, autofocus, className, id } = props;
  const handleItemChanged = (index: number, newItem: Option) => {
    value[index] = newItem;
    props.onChange([...value]);
  };
  const handleItemAdd = () => {
    value.push({
      value: getRandomString(),
      label: `选项${(value||[]).length + 1}`
    });
    props.onChange([...value]);
  };
  const handleItemRemoved = (index: number) => {
    value.splice(index, 1);
    props.onChange([...value]);
  };
  const handleDragEnd: any = ({ source, destination, draggableId }: DropResult) => {
    const sourceIndex = source.index;
    const destinationIndex = destination?.index || 0;
    console.log(destination, source, draggableId);
    const value = props.value || [];
    const [removed] = value.splice(sourceIndex, 1);
    value.splice(destinationIndex, 0, removed);
    props.onChange([...value]);
  };
  return (
    <div className="option-editor-widget">
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId={`drop-option-${id}`}>
          {(provided: DroppableProvided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {value.map((option, index) => {
                  return (
                    <Draggable
                      draggableId={`drop-option-${id}_${option.value}`}
                      key={`drop-option-${id}_${option.value}`}
                      index={index}
                    >
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            padding: "5px 0"
                          }}
                        >
                          <OptionItem
                            value={option.value}
                            label={option.label}
                            key={option.value}
                            onRemove={() => {
                              handleItemRemoved(index);
                            }}
                            onChange={(newItem: { label: string, value: string }) => {
                              handleItemChanged(index, {
                                label: newItem.label,
                                value: newItem.value
                              });
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <div
        className="option-item-add"
        onClick={() => {
          handleItemAdd();
        }}
      >
        <PlusOutlined />
        添加选项
      </div>
    </div>
  );
};

OptionEditorWidget.displayName = "OptionEditorWidget";
OptionEditorWidget.defaultProps = {
  label: "",
  disabled: false,
  value: [],
  onChange: () => {
  },
  options: {}
};

export default React.memo(OptionEditorWidget);
