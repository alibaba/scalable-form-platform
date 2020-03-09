import XFormBuilder, {xformBuilderReducer} from './index';
import {LocaleProvider} from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import formSchema from './formSchema';

const xformBuilderBlock4NameSpace = 'xformBuilderJdsfec';
const locales = {
  'zh_CN': zh_CN,
  'en_US': en_US
};

const store = createStore(
  combineReducers(xformBuilderReducer),
  compose(applyMiddleware(thunkMiddleware))
);

class Element extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      locale: 'zh_CN'
    };
  }

  render() {
    const locale = this.state.locale;
    return (
      <Provider store={store}>
        <div className="portal">
          <LocaleProvider locale={locales[locale]}>
            <div className="xform-builder-demos">
              <div className="simple-container">
                <h2 className="block-title">不使用formCode的表单设计器</h2>
                <div className="simple-xform-container">
                  <XFormBuilder
                    platformConfigSupport={true}
                    platform="both"
                    systemTemplate="397ef9b6b4a5457695bae9b2bbab26a9"
                    jsonSchema={formSchema.jsonSchema}
                    uiSchema={formSchema.uiSchema}
                    formData={formSchema.formData}
                    bizData={formSchema.bizData}
                    sequence={formSchema.sequence}
                    namespace={xformBuilderBlock4NameSpace}
                  />
                </div>
              </div>
            </div>
          </LocaleProvider>
        </div>
      </Provider>
    );
  }
}

export default Element
