import React, {Component} from 'react';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {XFormBuilderWithoutDragDropContext, xformBuilderReducer} from '../packages/scalable-form-editor/src/index';
import formSchema from './formSchema';

let store = createStore(
  combineReducers(xformBuilderReducer),
  compose(applyMiddleware(thunkMiddleware))
);

class Element extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <div className="scalable-form-demo-element inline">
          <XFormBuilderWithoutDragDropContext
            env="dev"
            jsonSchema={formSchema.jsonSchema}
            uiSchema={formSchema.uiSchema}
            formData={formSchema.formData}
            bizData={formSchema.bizData}
            sequence={formSchema.sequence}
            namespace={'xformBuilderJdsfec'}
          />
        </div>
      </Provider>
    );
  }
}

const WrappedElement = DragDropContext(HTML5Backend)(Element);

export default WrappedElement;
