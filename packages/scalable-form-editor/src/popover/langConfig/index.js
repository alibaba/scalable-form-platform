/**
 * 编辑器顶部操作栏：语言配置相关浮层
 * @props: visible（popover是否显示） langConfig（当前的多语言配置，值的数据结构为：    {
        "langs": [{
            "name": "English",
            "locale": "en-US",
            "enabled": true
        }, ...],
        "defaultLang": "en-US",
        "currentLang": "en-US"
    }
用来控制当前的多语言配置值） langConfigChangeHandler（多语言配置切换处理回调方法） langConfigVisibleChangeHandler（popover的onVisibleChange处理器）
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Popover, Table, Switch, Modal} from 'antd';
import classnames from 'classnames';
import he from 'he';

import './index.less';
import {getMessageId} from '../../i18n/localeMessages';

export default function LangConfigPopover(props) {
    const {visible, langConfig, messages, langConfigChangeHandler, langConfigVisibleChangeHandler, popupContainer, children} = props;

    // 格式化langConfig数据使其适用于渲染Table
    const tableDataSource = langConfig.langs.map((lang) => {
        if (lang.locale === langConfig.defaultLang) {
            lang.default = true
        } else {
            lang.default = false;
        }
        if (lang.locale === langConfig.currentLang) {
            lang.current = true;
        } else {
            lang.current = false;
        }
        return lang;
    });

    const tableColumns = [{
        title: messages[getMessageId('xformLangConfigEnableLabel')],
        dataIndex: 'enabled',
        key: 'enabled',
        render: (value, record) => {
            const changedLocale = record.locale;
            let changedLangConfig = JSON.parse(JSON.stringify(langConfig));
            return <Switch checked={value} onChange={(checked) => {
                changedLangConfig.langs = langConfig.langs.map((lang) => {
                    if (lang.locale === changedLocale) {
                        lang.enabled = checked;
                    }
                    return lang;
                });
                langConfigChangeHandler(changedLangConfig);
            }} />
        }
    }, {
        title: messages[getMessageId('xformLangConfigLangNameLabel')],
        dataIndex: 'name',
        key: 'name',
        render: (localeName, record) => {
            return (
                <div className="lang-name-cell">
                    <span>{he.decode(localeName)}</span>
                    <span className={classnames({
                        default: true,
                        hidden: !record.default
                    })}>
                        <i className="xform-iconfont">&#xe968;</i>
                        {messages[getMessageId('xformLangConfigDefaultLangTip')]}
                    </span>
                    <span className={classnames({
                        current: true,
                        hidden: !record.current
                    })}>{messages[getMessageId('xformLangConfigCurrentLangTip')]}</span>
                </div>
            );
        }
    }, {
        title: messages[getMessageId('xformLangConfigOperationLabel')],
        dataIndex: 'action',
        key: 'action',
        render: (value, record) => {
            const changedLocale = record.locale;
            let changedLangConfig = JSON.parse(JSON.stringify(langConfig));
            return (
                <span className="lang-action-cell">
                    <a
                        href="javascript:;"
                        className={classnames({
                            'not-allow': record.current
                        })}
                        onClick={(event) => {
                            event.preventDefault();
                            if (record.current) {
                                return;
                            }
                            // 在切换当前语言要让用户二次确认是否这样操作
                            Modal.confirm({
                                title: messages[getMessageId('xformChangeLangConfirmTitle')],
                                content: messages[getMessageId('xformChangeLangConfirmContent')],
                                getContainer: popupContainer,
                                onOk: () => {
                                    changedLangConfig.currentLang = changedLocale;
                                    langConfigChangeHandler(changedLangConfig, true);
                                }
                            });
                        }}
                    >{messages[getMessageId('xformLangConfigSwitchLangOperation')]}</a>
                    <a
                        href="javascript:;"
                        className={classnames({
                            'not-allow': record.default || !record.enabled
                        })}
                        onClick={(event) => {
                            event.preventDefault();
                            if (record.default || !record.enabled) {
                                return;
                            }
                            changedLangConfig.defaultLang = changedLocale;
                            langConfigChangeHandler(changedLangConfig);
                        }}
                    >{messages[getMessageId('xformLangConfigSwitchDefaultOperation')]}</a>
                </span>
            );
        }
    }];
    return (
        <Popover
            title=""
            overlayClassName="app-xform-builder-lang-config-popover"
            overlayStyle={{
                zIndex: 1000
            }}
            content={(
                <Table
                    rowKey="locale"
                    className="lang-config-table"
                    columns={tableColumns}
                    dataSource={tableDataSource}
                    pagination={false}
                />
            )}
            visible={visible}
            onVisibleChange={langConfigVisibleChangeHandler}
            trigger="click"
            placement="bottomLeft"
            getPopupContainer={popupContainer}
        >
            {children}
        </Popover>
    );
}

LangConfigPopover.propTypes = {
    visible: PropTypes.bool.isRequired,
    langConfig: PropTypes.shape({
        langs: PropTypes.array.isRequired,
        defaultLang: PropTypes.string.isRequired,
        currentLang: PropTypes.string.isRequired
    }),
    langConfigChangeHandler: PropTypes.func.isRequired,
    langConfigVisibleChangeHandler: PropTypes.func.isRequired,
    popupContainer: PropTypes.func.isRequired
};
