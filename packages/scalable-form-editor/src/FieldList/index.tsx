import React, { useEffect, useState } from 'react';
import { JSONSchema, UiSchema } from 'scalable-form-core';
import { Platform, WidgetKey } from "scalable-form-tools";
import ScalableForm from 'scalable-form-antd';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { DropField } from '../utils/Config';
import CustomFieldTemplate from './CustomFieldTemplate';
import ScalableFormMobile from 'scalable-form-antd-mobile';
import './index.less';
import OptionEditorWidget from "../components/OptionEditorWidget";

interface Props {
  /**
   * 当前编排schema
   */
  schema: JSONSchema;
  /**
   * 当前表单uiSchema
   */
  uiSchema: UiSchema;
  /**
   * 是否preview
   */
  isPreview: boolean;
  /**
   * 当前platform
   */
  platform: Platform;
}

const FieldList: React.FC<Props> = (props: Props) => {
  const { isPreview } = props;
  const Template: React.FunctionComponent | undefined = props.isPreview
    ? undefined
    : (CustomFieldTemplate as React.FunctionComponent);
  const [hide, setHide] = useState<boolean>(false);
  const [originIsPreview, setOriginPreview] = useState<boolean>(false);
  useEffect(() => {
    if (originIsPreview !== isPreview) {
      setHide(true);
      setImmediate(() => {
        setHide(false);
      });
    }
    setOriginPreview(isPreview);
  }, [isPreview, originIsPreview]);
  if (hide) {
    return null;
  }
  const defaultButton = isPreview ? null : <div />;
  return (
    <div>
      <Droppable droppableId={DropField.FIELD_LIST}>
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.platform === Platform.MOBILE ? (
                <div className={`mobile-preview-holder ${isPreview ? 'preview' : ''}`}>
                  <ScalableFormMobile schema={props.schema} uiSchema={props.uiSchema} FieldTemplate={Template}>
                    {defaultButton}
                  </ScalableFormMobile>
                </div>
              ) : (
                <div className={`pc-preview-holder ${isPreview ? 'preview' : ''}`}>
                  <ScalableForm
                    schema={props.schema} uiSchema={props.uiSchema} FieldTemplate={Template}>
                    {defaultButton}
                  </ScalableForm>
                </div>
              )}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default React.memo(FieldList);
