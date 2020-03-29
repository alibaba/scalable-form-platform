import {Layout, LocaleProvider, Menu, Alert} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import 'antd/lib/style/components.less';
// import 'antd/lib/style/index.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
  HashRouter,
  NavLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {xformBuilderReducer} from 'scalable-form-editor';
import XFormDashboard from "./components/FormConfig";
import './index.less';

const MenuItem = Menu.Item;
const store = createStore(combineReducers(xformBuilderReducer), applyMiddleware(thunkMiddleware));
const {Header, Content} = Layout;

interface State {
  current: string,
  avatarPopoverVisible: boolean
}

export default class XFormAdmin extends React.PureComponent<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      current: '',
      avatarPopoverVisible: false
    };
  }

  public componentDidMount = () => {
    this.setState({
      current: location.hash.slice(1)
    });
  };

  public handleMenuClick = (event: any) => {
    this.setState({
      current: event.key
    });
  };

  public render() {
    const {current} = this.state;
    return (
      <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
          <HashRouter>
            <Layout className="app-common-layout">
              <Header className="header layout-header">
                <div className="logo">
                  XForm
                </div>
                <Menu
                  className="nav-links"
                  theme="dark"
                  mode="horizontal"
                  selectedKeys={[current]}
                  onClick={this.handleMenuClick}
                  style={{lineHeight: '64px'}}
                >
                  <MenuItem key="/formConfig">
                    <NavLink to="/formConfig">表单配置</NavLink>
                  </MenuItem>
                </Menu>
                <div className="right-wrapper">
                  <Menu className="nav-entries" theme="dark" mode="horizontal" style={{lineHeight: '64px'}}>
                    <MenuItem>
                      <a target="_blank" href="https://scalable-form-platform.github.io/">文档</a>
                    </MenuItem>
                  </Menu>
                  <div className="login-user-wrapper">
                    <div className="login-avator">
                      <div className="avator">
                        <img src="//wwc.alicdn.com/avatar/getAvatar.do?userId=2063803566160841&width=80&height=80&type=sns" />
                      </div>
                    </div>
                    <span className="login-name">匿名</span>
                  </div>
                </div>
              </Header>
              <Content className="content layout-content">
                {(window as any).isDemo ? (
                  <Alert
                    message="【demo模式】没有配置数据库信息"
                    description="当前服务运行在demo模式下，系统使用内存数据库保存数据，重启后所有数据将消失，您可以查看这里配置数据库连接"
                    type="warning"
                    showIcon
                  />
                ) : null}
                <Switch>
                  <Redirect exact={true} from="/" to="/formConfig" />
                  <Route path="/formConfig" component={XFormDashboard} />
                </Switch>
              </Content>
            </Layout>
          </HashRouter>
        </LocaleProvider>
      </Provider>
    );
  }
}

ReactDOM.render((
  <XFormAdmin />
), document.getElementById('root'));
