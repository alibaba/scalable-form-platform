/**
 * Mirror组件通过context获取国际化文案的HOC
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {messages} from './i18n/localeMessages';

export default function localeMessagesWrapper(YComponent) {
    return class extends Component {
        static propTypes = {
            locale: PropTypes.string
        };

        static defaultProps = {
            locale: navigator.language.toLocaleLowerCase()
        };

        constructor(props) {
            super(props);
            this.getWrappedInstance = this.getWrappedInstance.bind(this);
            this.XFormSubmit = this.XFormSubmit.bind(this);
            this.XFormInitFormData = this.XFormInitFormData.bind(this);
            this.XFormReset = this.XFormReset.bind(this);
            this.XFormSetFormData = this.XFormSetFormData.bind(this);
            this.XFormCurrentFormData = this.XFormCurrentFormData.bind(this);
            this.XFormBizData = this.XFormBizData.bind(this);
            this.XFormValidate = this.XFormValidate.bind(this);
            this.XFormValidateSync = this.XFormValidateSync.bind(this);
            this.XFormFetchAllFromDataSource = this.XFormFetchAllFromDataSource.bind(this);
            this.XFormFetchFromDataSource = this.XFormFetchFromDataSource.bind(this);
            this.state = {
                locale: props.locale
            };
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.locale !== this.props.locale) {
                this.setState({
                    locale: nextProps.locale
                });
            }
        }

        getWrappedInstance() {
            return this.refs.wrappedInstance;
        }

        XFormSubmit() {
            this.getWrappedInstance().XFormSubmit();
        }

        XFormInitFormData() {
            return this.getWrappedInstance().XFormInitFormData();
        }

        XFormReset() {
            this.getWrappedInstance().XFormReset();
        }

        XFormSetFormData(...args) {
            this.getWrappedInstance().XFormSetFormData(...args);
        }

        XFormCurrentFormData() {
            return this.getWrappedInstance().XFormCurrentFormData();
        }

        XFormBizData() {
            return this.getWrappedInstance().XFormBizData();
        }

        XFormValidate(...args) {
            this.getWrappedInstance().XFormValidate(...args);
        }

        XFormValidateSync() {
            return this.getWrappedInstance().XFormValidateSync();
        }

        XFormFetchAllFromDataSource() {
            this.getWrappedInstance().XFormFetchAllFromDataSource();
        }

        XFormFetchFromDataSource(...args) {
            this.getWrappedInstance().XFormFetchFromDataSource(...args);
        }

        render() {
            const locale = this.state.locale;
            return (
                <YComponent
                    ref="wrappedInstance"
                    messages={messages[locale] || messages['en-us']}
                    {...this.props}
                />
            );
        }
    }
}

