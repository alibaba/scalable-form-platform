import { FormData, JSONSchema, UiSchema } from "scalable-form-core";
import _ from "lodash";
import WidgetKey from "scalable-form-tools/src/widgets";
import { getRandomString, LanguagePack, Locale } from "scalable-form-tools";
import getInitSchema from "../utils/getInitSchema";

/**
 * 方法context
 */
interface MethodContext {
  schema?: JSONSchema;
  uiSchema?: UiSchema;
  locale?: Locale;
  languagePack?: LanguagePack;
}

/**
 * 更新表单中组件排序
 * @param {string} widgetId 移动的组件widgetId
 * @param {number} sourceIndex 原始排序
 * @param {number} destinationIndex 目标排序
 * @param {MethodContext} context
 * @returns {{newSchema: JSONSchema newUiSchema: UiSchema}}
 */
export function updateWidgetOrder(
  widgetId: string,
  sourceIndex: number,
  destinationIndex: number,
  context: MethodContext
): { newSchema: JSONSchema; newUiSchema: UiSchema } {
  const originSchema: JSONSchema = { ...(context.schema || getInitJsonSchema()) };
  const originUiSchema: UiSchema = { ...(context.uiSchema || getInitUISchema()) };
  const order = [...(originUiSchema["ui:order"] || [])];
  const [removed] = order.splice(sourceIndex, 1);
  order.splice(destinationIndex, 0, removed);
  originUiSchema["ui:order"] = order;
  return {
    newSchema: getJsonSchemaByUiOrders(originSchema, order),
    newUiSchema: { ...originUiSchema }
  };
}

/**
 * 从表单中删除组件
 * @param {string} widgetId 删除的widgetId
 * @param {MethodContext} context
 * @returns {{newSchema: JSONSchema newUiSchema: UiSchema}}
 */
export function deleteWidgetFromSchema(
  widgetId: string,
  context: MethodContext
): { newSchema: JSONSchema; newUiSchema: UiSchema } {
  const originSchema: JSONSchema = { ...(context.schema || getInitJsonSchema()) };
  const originUiSchema: UiSchema = { ...(context.uiSchema || getInitUISchema()) };
  if (originSchema.properties) {
    delete originSchema.properties[widgetId];
  }
  delete originUiSchema[widgetId];
  const originOrders = originUiSchema["ui:order"] || [];
  originUiSchema["ui:order"] = originOrders.filter((orderId) => {
    return orderId !== widgetId;
  });
  return {
    newSchema: originSchema,
    newUiSchema: {
      ...originUiSchema,
      "ui:order": [...originOrders]
    }
  };
}

export function insertWidgetToSchema(
  widgetKey: WidgetKey,
  index: number,
  context: MethodContext
): { newSchema: JSONSchema; newUiSchema: UiSchema } {
  const originSchema: JSONSchema = context.schema || getInitJsonSchema();
  const originUiSchema: UiSchema = context.uiSchema || getInitUISchema();
  const code = getRandomString();
  const initConfigSchema = getInitSchema(widgetKey, context.locale || Locale.ZH_CN, context.languagePack || {});
  const newSchema = {
    ...originSchema,
    properties: originSchema.properties || {}
  };
  newSchema.properties[code] = initConfigSchema.initJsonSchema || null;
  const newUiSchema = {
    ...originUiSchema,
    [code]: initConfigSchema.initUISchema
  };
  const order: string[] = newUiSchema["ui:order"] || [];
  order.splice(index, 0, code);
  return {
    newSchema,
    newUiSchema: {
      ...newUiSchema,
      "ui:order": [...order]
    }
  };
}

export function getJsonSchemaByUiOrders(originJSONSchema: JSONSchema, orders: string[]) {
  const { properties = {} } = originJSONSchema;
  const newProperties = {};
  orders.forEach((orderKey: string) => {
    newProperties[orderKey] = {
      ...properties[orderKey]
    };
  });
  return {
    ...originJSONSchema,
    properties
  };
}

export function getInitJsonSchema(): JSONSchema {
  return {
    title: "",
    description: "",
    type: "object",
    required: [],
    properties: {}
  };
}

export function getInitUISchema(): UiSchema {
  return {
    "ui:order": []
  };
}

export function getCurrentIndexByIdAndUiSchema(id: string, uiSchema: UiSchema) {
  const idList = id.split("_");
  let currentUiSchema: UiSchema = {};
  for (let i = 0; i < idList.length - 1; i += 1) {
    const id = idList[i];
    if (id === "root") {
      currentUiSchema = uiSchema;
    } else {
      currentUiSchema = currentUiSchema[id];
    }
  }
  const orderList: string[] = currentUiSchema["ui:order"] || [];
  return orderList.findIndex((order) => {
    return order === idList[idList.length - 1];
  });
}

export function isFieldRoot(id: string) {
  return id === "root";
}

export function getWidgetKeyById(id: string, uiSchema: UiSchema): WidgetKey {
  const ui = uiSchema[id] || {};
  return ui["ui:widget"];
}

export function getWidgetId(id: string): string {
  const idList = id.split("_");
  return idList[idList.length - 1];
}

export function updateSelectedFieldId(originSelectedFieldId: string, originWidgetKey: string, newWidgetKey: string) {
  if (originSelectedFieldId) {
    return originSelectedFieldId.replace(originWidgetKey, newWidgetKey);
  }
  return originSelectedFieldId;
}

export function getFormDataBySchema(
  widgetId: string,
  widgetKey: string,
  configFormData: FormData,
  schema: JSONSchema,
  uiSchema: UiSchema
): FormData {
  const required = schema.required || [];
  const property: JSONSchema = (schema.properties || {})[widgetId] || {};
  const widgetUiSchema: UiSchema = uiSchema[widgetId] || {};
  const widgetUiOptions: { [key: string]: boolean | number | string | object | any[] | null } =
    widgetUiSchema["ui:options"] || {};
  const enumKeyList = property["enum"] || [];
  const enumNameList = property["enumNames"] || [];
  const items = enumKeyList.map((enumKey, index) => {
    return {
      value: enumKey,
      label: enumNameList[index]
    };
  });
  const result: FormData = {
    ...configFormData,
    code: widgetId,
    name: property.title,
    placeholder: widgetUiSchema["ui:placeholder"],
    value: property.default || configFormData.value,
    description: widgetUiSchema["ui:help"],
    hidden: widgetUiSchema["ui:hidden"],
    maxLength: property.maxLength || 0,
    disabled: widgetUiSchema["ui:disabled"],
    require: required.indexOf(widgetId) >= 0,
    maximum: property.maximum,
    minimum: property.minimum,
    uploadType: widgetUiOptions.uploadType,
    maxFileNum: property.maxFileNum,
    maxFileSize: property.maxFileSize,
    exampleImageUrl: widgetUiOptions.exampleImageUrl,
    initRange: widgetUiOptions.initRange
  };
  widgetUiSchema["ui:options"] = widgetUiSchema["ui:options"] || {};
  if (widgetUiSchema["ui:options"].groupName) {
    result.groupName = widgetUiSchema["ui:options"].groupName as string;
  }
  if (property["enum"]) {
    result.items = items;
  }
  return result;
}

export function updateSchema(
  widgetId: string,
  widgetKey: WidgetKey,
  fieldConfigFormData: FormData,
  originJsonSchema: JSONSchema,
  originUiSchema: UiSchema
): { jsonSchema: JSONSchema; uiSchema: UiSchema } {
  const newJsonSchema = _.cloneDeep(originJsonSchema);
  const newUiSchema = _.cloneDeep(originUiSchema);
  const result: { jsonSchema: JSONSchema; uiSchema: UiSchema } = {
    jsonSchema: newJsonSchema,
    uiSchema: newUiSchema
  };
  if (widgetId !== fieldConfigFormData.code) {
    const res = updateSchemaWidgetId(widgetId, fieldConfigFormData.code as string, newJsonSchema, newUiSchema);
    result.jsonSchema = res.jsonSchema;
    result.uiSchema = res.uiSchema;
  }
  const res = updateSchemaByFormData(fieldConfigFormData, result.jsonSchema, result.uiSchema);
  result.jsonSchema = res.jsonSchema;
  result.uiSchema = res.uiSchema;
  return result;
}

function updateSchemaByFormData(
  fieldConfigFormData: FormData,
  originJsonSchema: JSONSchema,
  originUiSchema: UiSchema
): { jsonSchema: JSONSchema; uiSchema: UiSchema } {
  const newJsonSchema = _.cloneDeep(originJsonSchema);
  const newUiSchema = _.cloneDeep(originUiSchema);
  _.keys(fieldConfigFormData).forEach((formDataKey: string) => {
    newJsonSchema.properties = newJsonSchema.properties || {};
    const widgetId: string = fieldConfigFormData.code as string;
    const property: JSONSchema = newJsonSchema.properties[widgetId] || {};
    const uiSchema: UiSchema = newUiSchema[widgetId];
    switch (formDataKey) {
      case "name":
        property.title = fieldConfigFormData[formDataKey] as string;
        break;
      case "groupName":
        uiSchema["ui:options"] = uiSchema["ui:options"] || {};
        uiSchema["ui:options"].groupName = fieldConfigFormData[formDataKey] as string;
        break;
      case "uploadType":
        uiSchema["ui:options"] = uiSchema["ui:options"] || {};
        uiSchema["ui:options"].uploadType = fieldConfigFormData[formDataKey] as string;
        break;
      case "exampleImageUrl":
        uiSchema["ui:options"] = uiSchema["ui:options"] || {};
        uiSchema["ui:options"].exampleImageUrl = fieldConfigFormData[formDataKey] as string;
        break;
      case "initRange":
        uiSchema["ui:options"] = uiSchema["ui:options"] || {};
        uiSchema["ui:options"].initRange = fieldConfigFormData[formDataKey] as string;
        break;
      case "placeholder":
        uiSchema["ui:placeholder"] = fieldConfigFormData[formDataKey] as string;
        break;
      case "description":
        uiSchema["ui:help"] = fieldConfigFormData[formDataKey] as string;
        break;
      case "value":
        property.default = fieldConfigFormData[formDataKey] as string;
        break;
      case "hidden":
        uiSchema["ui:hidden"] = fieldConfigFormData[formDataKey] as string;
        break;
      case "maximum":
        try {
          property.maximum = parseInt(fieldConfigFormData[formDataKey] as string, 10) || undefined;
        } catch (e) {
          property.maximum = undefined;
        }
        break;
      case "minimum":
        try {
          property.minimum = parseInt(fieldConfigFormData[formDataKey] as string, 10) || undefined;
        } catch (e) {
          property.minimum = undefined;
        }
        break;
      case "maxFileSize":
        try {
          property.maxFileSize = parseInt(fieldConfigFormData[formDataKey] as string, 10) || undefined;
        } catch (e) {
          property.maxFileSize = undefined;
        }
        break;
      case "maxFileNum":
        try {
          property.maxFileNum = parseInt(fieldConfigFormData[formDataKey] as string, 10) || undefined;
        } catch (e) {
          property.maxFileNum = undefined;
        }
        break;
      case "maxLength":
        try {
          property.maxLength = parseInt(fieldConfigFormData[formDataKey] as string, 10) || undefined;
        } catch (e) {
          property.maxLength = 0;
        }
        break;
      case "disabled":
        uiSchema["ui:disabled"] = fieldConfigFormData[formDataKey] as boolean;
        break;
      case "require":
        try {
          const require: boolean = fieldConfigFormData[formDataKey] as boolean;
          const required = [...(newJsonSchema.required || [])];
          const index = required.indexOf(widgetId);
          if (index >= 0 && !require) {
            required.splice(index, 1);
          } else if (index < 0 && require) {
            required.push(widgetId);
          }
          newJsonSchema.required = required;
        } catch (e) {
          break;
        }
        break;
      case "items":
        console.log(340, fieldConfigFormData[formDataKey]);
        const items: { label: string, value: string }[] = (fieldConfigFormData[formDataKey] || []) as { label: string, value: string }[];
        property.enum = items.map((item: { label: string, value: string }) => {
          return item.value;
        });
        property.enumNames = items.map((item: { label: string, value: string }) => {
          return item.label;
        });
        break;
    }
  });
  return {
    jsonSchema: newJsonSchema,
    uiSchema: newUiSchema
  };
}

export function updateSchemaWidgetId(
  originWidgetId: string,
  newWidgetId: string,
  jsonSchema: JSONSchema,
  uiSchema: UiSchema
): { jsonSchema: JSONSchema; uiSchema: UiSchema } {
  const newJsonSchema = _.cloneDeep(jsonSchema);
  const newUiSchema = _.cloneDeep(uiSchema);
  newJsonSchema.properties = newJsonSchema.properties || {};
  newJsonSchema.properties[newWidgetId] = { ...newJsonSchema.properties[originWidgetId] };
  delete newJsonSchema.properties[originWidgetId];
  newUiSchema[newWidgetId] = { ...newUiSchema[originWidgetId] };
  delete newUiSchema[originWidgetId];
  const orderList = [...(newUiSchema["ui:order"] || [])];
  const orderIndex = orderList.findIndex((orderId) => {
    return orderId === originWidgetId;
  });
  if (orderIndex >= 0) {
    orderList.splice(orderIndex, 1, newWidgetId);
  }
  newUiSchema["ui:order"] = [...orderList];
  return {
    jsonSchema: newJsonSchema,
    uiSchema: newUiSchema
  };
}
