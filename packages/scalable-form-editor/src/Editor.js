/**
 * 入口文件，redux的Provider以及ReactDOM操作均由xspace完成
 * xform-builder-app的store数据结构：
 * {
 *     xformBuilderData: {
 *         [namespace]: {
 *              dataSource: [{label: '不使用数据源', value: ''}],  // 数据源列表
 *              formDataSource: [{label: '不使用数据源', value: ''}],  // 表单数据源列表
 *              serverCode: [{label: '订单编号校验', value: 'order'}], // 动态校验器列表
 *              fields: []      //表单field描述
 *              systemField: []  //表单系统字段
 *              commonField: [] //通用field
 *              xformBizData: {} //表单业务属性通用配置数据
 *              xformOptionBizData: {} //表单选项的业务属性通用配置数据
 *              editFieldData: {}//编辑中的field数据
 *         }
 *     }
 * }
 */

import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

import localeMessagesWrapper from './localeHOC';
import contextWrapper from './contextWrapper';
import APP from './App';


// app的reducers和actionCreator集合
import reducer from './reducer/index';
import actionCreators from './actionCreator/index';

// 使用redux进行数据管理以及APP之间数据通信 文档：http://hi.alibaba.net/_book/content/app_communicate.html
const XFormBuilder = connect((store, ownProps) => {
    const namespace = ownProps.namespace;
    if (typeof namespace === 'undefined' || namespace === '') {
        console.warn('xformBuilder:使用xformBuilder组件建议传入唯一性的namespace属性，否则会因为store数据共享导致问题');
    }
    return {
        xformBuilderData: store.xformBuilderData[namespace] || store.xformBuilderData
    };
})(contextWrapper(localeMessagesWrapper(APP)));

XFormBuilder.defaultProps = {
    namespace: 'xformBuilderDefault'
};

export default XFormBuilder;

export const XFormBuilderWithoutDragDropContext = connect((store, ownProps) => {
    const namespace = ownProps.namespace;
    if (typeof namespace === 'undefined' || namespace === '') {
        console.warn('xformBuilder:使用xformBuilder组件建议传入唯一性的namespace属性，否则会因为store数据共享导致问题');
    }
    return {
        xformBuilderData: store.xformBuilderData[namespace] || store.xformBuilderData
    };
})(localeMessagesWrapper(APP));

XFormBuilderWithoutDragDropContext.defaultProps = {
    namespace: 'xformBuilderDefault'
};

export const action = actionCreators;

export const xformBuilderReducer = {
    xformBuilderData: reducer
};

export {DragDropContext};
export {HTML5Backend};
