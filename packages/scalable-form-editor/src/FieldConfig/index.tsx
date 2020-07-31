import React from "react";
import Form from "scalable-form-antd";
import { JSONSchema, UiSchema, FormData } from "scalable-form-core";
import { LanguagePack, Locale, WidgetKey } from "scalable-form-tools";
import ConfigSchema from "../schema/ConfigSchema";
import { getFormDataBySchema, getWidgetKeyById, updateSchema } from "../schema/SchemaUtils";
import PickerItem from "../schema/PickerItem";
import getConfigSchema from "../utils/getConfigSchema";
import { IChangeEvent } from "@rjsf/core";
import OptionEditorWidget from "../components/OptionEditorWidget";
import './index.less';

interface FieldConfigProps {
  /**
   * 当前表单schema
   */
  schema: JSONSchema;
  /**
   * 当前表单uiSchema
   */
  uiSchema: UiSchema;
  /**
   * 选择器列表
   */
  pickerList: PickerItem[];
  /**
   * 当前选中的widgetId
   */
  selectedWidgetId: string;
  /**
   * 语言包
   */
  languagePack: LanguagePack;
  onChange: (newJsonSchema: JSONSchema, newUiSchema: UiSchema, newSelectedFieldId: string) => void;
}

export default function FieldConfig(props: FieldConfigProps) {
  const { selectedWidgetId, schema, uiSchema, onChange } = props;
  const widgetKey: WidgetKey = getWidgetKeyById(selectedWidgetId, props.uiSchema);
  const widgetConfig: ConfigSchema = getConfigSchema(widgetKey, Locale.ZH_CN, props.languagePack);
  const { configJsonSchema: originConfigJsonSchema, configUiSchema, configFormData } = widgetConfig;
  const formData = getFormDataBySchema(selectedWidgetId, widgetKey, configFormData, schema, uiSchema);
  const configJsonSchema = getConfigJsonSchemaByOriginSchema(selectedWidgetId, originConfigJsonSchema, schema);
  const handleFormDataChanged = (event: IChangeEvent<FormData>) => {
    const fieldConfigFormData = event.formData || {};
    const { jsonSchema: newJsonSchema, uiSchema: newUiSchema } = updateSchema(
      selectedWidgetId,
      widgetKey,
      fieldConfigFormData,
      schema,
      uiSchema
    );
    let newSelectedWidgetId: string = (formData.code as string) || "";
    if (formData.code !== fieldConfigFormData.code) {
      newSelectedWidgetId = (fieldConfigFormData.code as string) || "";
    }
    onChange(newJsonSchema, newUiSchema, newSelectedWidgetId);
  };
  return (
    <div className="scalable-form-editor-config">
      <Form
        widgets={{
          [WidgetKey.OptionEditor]: OptionEditorWidget
        }}
        schema={configJsonSchema} uiSchema={configUiSchema} formData={formData} onChange={handleFormDataChanged}>
        <div/>
      </Form>
    </div>
  );
}

function getConfigJsonSchemaByOriginSchema(
  selectedWidgetId: string,
  configJsonSchema: JSONSchema,
  schema: JSONSchema
): JSONSchema {
  const properties = configJsonSchema.properties || {};
  const originProperties = schema.properties || {};
  if (properties.value && properties.value.enum) {
    const property = originProperties[selectedWidgetId] || {};
    properties.value = {
      ...properties.value,
      type: property.type,
      default: property.default,
      enum: property.enum || undefined,
      enumNames: property.enumNames || undefined
    };
    if (property.items) {
      properties.value.items = property.items;
    }
  }
  return {
    ...configJsonSchema,
    properties
  };
}
