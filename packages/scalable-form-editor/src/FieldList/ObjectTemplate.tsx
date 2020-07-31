import React, { useContext, useCallback, useMemo } from "react";
import classNames from "classnames";
import { DraggableProvided, Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { FieldProps } from "@rjsf/core";
import SchemaContext from "../schema/SchemaContext";
import { Tag } from "antd";
import { getCurrentIndexByIdAndUiSchema, getWidgetId, getWidgetKeyById, isFieldRoot } from "../schema/SchemaUtils";
import { DropField } from "../utils/Config";
import "./ObjectTemplate.less";
import PickerItem from "../schema/PickerItem";

const ObjectTemplate: React.FC<FieldProps> = (props: FieldProps) => {
  const {
    uiSchema: globalUiSchema,
    selectedWidgetId,
    onUpdateSelectedWidgetId,
    onDeleteWidgetById,
    pickerList
  } = useContext(SchemaContext);
  const { schema, uiSchema, id, required } = props;
  console.log(28, schema, uiSchema, id, required, props, globalUiSchema);
  const hidden: boolean = uiSchema["ui:hidden"] || false;
  const widgetId = useMemo(() => {
    return getWidgetId(id || "");
  }, [id]);
  const widgetKey = useMemo(() => {
    return getWidgetKeyById(widgetId, globalUiSchema);
  }, [widgetId, globalUiSchema]);

  const index = useMemo(() => {
    return getCurrentIndexByIdAndUiSchema(id || "", globalUiSchema);
  }, [widgetId, globalUiSchema]);
  const pickerItem: PickerItem | undefined = useMemo(() => {
    return pickerList.find((picker: PickerItem) => {
      return picker.key === widgetKey;
    });
  }, [pickerList, widgetKey]);
  const memoizedDeleteFieldById = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedWidgetId === props.id) {
        onUpdateSelectedWidgetId(getWidgetId(""));
      }
      onDeleteWidgetById(getWidgetId(props.id || ""));
    },
    [onUpdateSelectedWidgetId, onDeleteWidgetById, props.id, selectedWidgetId]
  );
  if (isFieldRoot(props.id || "")) {
    return <div className="scalable-form-editor-root">{props.children}</div>;
  }
  const help = uiSchema["ui:help"];
  /* eslint-disable react/no-danger */
  return (
    <Draggable
      draggableId={`${DropField.FIELD_LIST}_${props.id}`}
      key={`${DropField.FIELD_LIST}_${props.id}`}
      index={index}
    >
      {(draggableProvided: DraggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          className={classNames("scalable-form-editor-object-field", {
            selected: selectedWidgetId === getWidgetId(props.id || "")
          })}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          style={{
            ...draggableProvided.draggableProps.style
          }}
          onClick={() => {
            onUpdateSelectedWidgetId(getWidgetId(props.id || ""));
          }}
        >
          <div className="field-index-number">{index + 1}</div>
          <div className={classNames("field-title", { required })}>
            {hidden ? <Tag>隐藏</Tag> : null}
            {pickerItem && pickerItem.label}: {schema.title}
          </div>
          {hidden ? null : (
            <div>
              <Droppable droppableId={id || ''}>
                {(droppableProvided: DroppableProvided) => {
                  return (
                    <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                      {props.children}
                      {droppableProvided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
              <div
                className="field-description"
                dangerouslySetInnerHTML={{
                  __html: help
                }}
              />
            </div>
          )}
          <div className="field-action-delete" onClick={memoizedDeleteFieldById}>
            <i className="xform-iconfont delete-icon">&#xe600;</i>
          </div>
        </div>
      )}
    </Draggable>
  );
  /* eslint-enable react/no-danger */
};

export default React.memo(ObjectTemplate);
