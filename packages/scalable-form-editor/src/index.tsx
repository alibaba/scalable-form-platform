import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PickerItem from './schema/PickerItem';
import { DropField } from './utils/Config';
import './index.less';
import Header from './Header';
import FieldPicker from './FieldPicker';
import FieldList from './FieldList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { JSONSchema, UiSchema } from 'scalable-form-core';
import { LanguagePack, Locale, LocaleContext, Platform } from 'scalable-form-tools';
import SchemaContext from './schema/SchemaContext';
import {
  deleteWidgetFromSchema,
  getInitJsonSchema,
  getInitUISchema,
  getWidgetId,
  insertWidgetToSchema,
  updateWidgetOrder,
} from './schema/SchemaUtils';
import getPickerList from './utils/getPickerList';
import localMessages from './localMessages';
import WidgetKey from 'scalable-form-tools/src/widgets';
import FieldConfig from './FieldConfig';
import { isPickerItemInPlatform, formatInitUiSchema } from './utils/Tool';

const languagePack: LanguagePack = require('../i18n');

/**
 * SchemaEditor组件使用props
 */
interface SchemaEditorProps {
  /**
   * 国际化标记
   */
  locale?: Locale;
  /**
   * 配置出来的表单schema
   */
  initSchema: JSONSchema;
  /**
   * 配置出来的表单uiSchema
   */
  initUiSchema: UiSchema;
}

/**
 * SchemaEditor组件内部state
 */
interface SchemaEditorState {
  /**
   * 配置出来的表单schema
   */
  schema: JSONSchema;
  /**
   * 配置出来的表单uiSchema
   */
  uiSchema: UiSchema;
  /**
   * 左侧字段组件配置
   */
  pickerList: PickerItem[];
  /**
   * 当前选中并配置的表单字段
   */
  selectedWidgetId: string;
  /**
   * 当前配置的表单平台
   */
  platform: Platform;
  /**
   * 是否全屏
   */
  fullscreen: boolean;
  /**
   * 是否预览
   */
  preview: boolean;
}

class SchemaEditor extends PureComponent<SchemaEditorProps, SchemaEditorState> {
  static defaultProps = {
    locale: Locale.ZH_CN,
  };

  constructor(props: SchemaEditorProps) {
    super(props);
    let schema: JSONSchema;
    let uiSchema: UiSchema;
    if (props.initSchema) {
      schema = props.initSchema;
    } else {
      schema = getInitJsonSchema();
    }
    if (props.initUiSchema) {
      uiSchema = formatInitUiSchema(props.initUiSchema);
    } else {
      uiSchema = getInitUISchema();
    }
    this.state = {
      pickerList: getPickerList(Locale.ZH_CN, languagePack),
      schema,
      uiSchema,
      selectedWidgetId: '',
      platform: Platform.BOTH,
      fullscreen: false,
      preview: false,
    };
  }

  private handleInsertWidget = (widgetKey: WidgetKey) => {
    const originUiSchema: UiSchema = this.state.uiSchema;
    const order: string[] = originUiSchema['ui:order'] || [];
    this.handleInsertWidgetByIndex(widgetKey, order.length || 0);
  };

  private handleInsertWidgetByIndex = (widgetKey: WidgetKey, index: number) => {
    const { newSchema, newUiSchema } = insertWidgetToSchema(widgetKey, index, {
      schema: this.state.schema,
      uiSchema: this.state.uiSchema,
      languagePack,
      locale: this.props.locale || Locale.ZH_CN,
    });
    this.setState({
      schema: newSchema,
      uiSchema: newUiSchema,
    });
  };

  private handleUpdateSchema = (newJsonSchema: JSONSchema, newUiSchema: UiSchema, newSelectedFieldId: string) => {
    this.setState({
      uiSchema: newUiSchema,
      schema: newJsonSchema,
      selectedWidgetId: newSelectedFieldId,
    });
  };

  private handleUpdateSelectedFieldId = (selectedWidgetId: string) => {
    this.setState({
      selectedWidgetId,
    });
  };

  private handleDeleteWidgetById = (widgetId: string) => {
    const { newSchema, newUiSchema } = deleteWidgetFromSchema(widgetId, {
      schema: this.state.schema,
      uiSchema: this.state.uiSchema,
      languagePack,
      locale: this.props.locale || Locale.ZH_CN,
    });
    this.setState({
      schema: newSchema,
      uiSchema: newUiSchema,
    });
  };

  private handleUpdateWidgetOrder = (widgetId: string, sourceIndex: number, destinationIndex: number) => {
    const { newSchema, newUiSchema } = updateWidgetOrder(widgetId, sourceIndex, destinationIndex, {
      schema: this.state.schema,
      uiSchema: this.state.uiSchema,
      languagePack,
      locale: this.props.locale || Locale.ZH_CN,
    });
    this.setState({
      schema: newSchema,
      uiSchema: newUiSchema,
    });
  };

  private handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (source && source.droppableId === DropField.PICKER) {
      if (destination && destination.droppableId === DropField.FIELD_LIST) {
        const widgetKey: WidgetKey = getWidgetId(draggableId) as WidgetKey;
        this.handleInsertWidgetByIndex(widgetKey, destination.index);
      }
    } else if (source && source.droppableId === DropField.FIELD_LIST) {
      if (destination && destination.droppableId === DropField.FIELD_LIST) {
        const widgetId: string = getWidgetId(draggableId);
        this.handleUpdateWidgetOrder(widgetId, source.index, destination.index);
      }
    }
  };

  private handleUpdatePlatform = (newPlatform: Platform) => {
    this.setState({
      platform: newPlatform,
    });
  };

  private handleToggleFullScreen = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    });
  };

  private handleTogglePreview = () => {
    this.setState({
      preview: !this.state.preview,
    });
  };

  render() {
    const { fullscreen, selectedWidgetId, pickerList = [] } = this.state;
    let maxHeight = 700;
    const filterPickerList = pickerList.filter((picker: PickerItem) => {
      return isPickerItemInPlatform(picker, this.state.platform);
    });
    if (filterPickerList.length > 15) {
      maxHeight = filterPickerList.length * 40;
    }
    return (
      <LocaleContext.Provider
        value={{
          locale: this.props.locale || Locale.ZH_CN,
          languagePack,
          localMessages,
        }}
      >
        <SchemaContext.Provider
          value={{
            pickerList: this.state.pickerList,
            schema: this.state.schema,
            uiSchema: this.state.uiSchema,
            selectedWidgetId,
            onUpdateSelectedWidgetId: this.handleUpdateSelectedFieldId,
            onDeleteWidgetById: this.handleDeleteWidgetById,
          }}
        >
          <div
            className={classNames({
              'scalable-form-builder': true,
              fullscreen,
            })}
            style={{
              width: fullscreen ? '100%' : 'auto',
            }}
          >
            <Header
              isPreview={this.state.preview}
              onTogglePreview={this.handleTogglePreview}
              isFullscreen={this.state.fullscreen}
              onToggleFullScreen={this.handleToggleFullScreen}
              platform={this.state.platform}
              locale={this.props.locale || Locale.ZH_CN}
              onUpdatePlatform={this.handleUpdatePlatform}
            />
            <div className="scalable-form-builder-panel">
              <DragDropContext onDragEnd={this.handleDragEnd}>
                <div
                  className="scalable-form-field-picker-panel"
                  style={{
                    height: fullscreen ? '100%' : 'auto',
                  }}
                >
                  <FieldPicker
                    pickerList={this.state.pickerList}
                    platform={this.state.platform}
                    onInsertWidget={this.handleInsertWidget}
                  />
                </div>
                <div
                  className="field-list-panel"
                  style={{
                    height: fullscreen ? '100%' : 'auto',
                    maxHeight: fullscreen ? undefined : maxHeight,
                  }}
                >
                  <FieldList
                    isPreview={this.state.preview}
                    platform={this.state.platform}
                    uiSchema={this.state.uiSchema}
                    schema={this.state.schema}
                  />
                </div>
              </DragDropContext>
              <div
                className="field-config-drawer-panel"
                style={{
                  width: fullscreen || selectedWidgetId ? 380 : 0,
                  height: fullscreen ? '100%' : 'auto',
                  display: fullscreen || selectedWidgetId ? 'block' : 'none',
                }}
              >
                {this.state.selectedWidgetId ? (
                  <FieldConfig
                    languagePack={languagePack}
                    schema={this.state.schema}
                    uiSchema={this.state.uiSchema}
                    pickerList={this.state.pickerList}
                    selectedWidgetId={selectedWidgetId}
                    onChange={this.handleUpdateSchema}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </SchemaContext.Provider>
      </LocaleContext.Provider>
    );
  }
}

export default SchemaEditor;
