import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import XFormBuilder, {xformBuilderReducer} from './Editor';
import {util} from './common/util';

class SchemaEditor extends PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.namespace = util.getRandomString(8);
        this.store = createStore(
          combineReducers(xformBuilderReducer),
          compose(applyMiddleware(thunkMiddleware))
        );
    }

    render() {
        return (
          <Provider store={this.store}>
              <XFormBuilder
                {...this.props}
                customUploadRequest={this.props.customUploadRequest || (() => {})}
                env={this.props.env || "dev"}
                namespace={this.props.namespace || this.namespace}
              />
          </Provider>
        );
    }
}

export default SchemaEditor;
