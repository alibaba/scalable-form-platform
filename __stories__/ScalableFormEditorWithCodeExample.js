import React, {Component} from 'react';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {XFormBuilderWithoutDragDropContext, xformBuilderReducer} from '../packages/scalable-form-editor/src/index';

let store = createStore(
  combineReducers(xformBuilderReducer),
  compose(applyMiddleware(thunkMiddleware))
);

class ScalableFormEditorWithCodeExample extends Component {
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
            formCode="a5ed2cafee594822ac06efe0f3a628fe"
            namespace={'xformBuilderJn81bq'}
          />
        </div>
      </Provider>
    );
  }
}

const WrappedElement = DragDropContext(HTML5Backend)(ScalableFormEditorWithCodeExample);

export default WrappedElement;
