/**
 * Mirror组件通过context获取国际化文案的HOC
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {messages} from './i18n/localeMessages';

export default function localeMessagesWrapper(YComponent) {
    return class extends PureComponent {
        static propTypes = {
            locale: PropTypes.string
        };

        static defaultProps = {
            locale: navigator.language.toLocaleLowerCase()
        };

        constructor(props) {
            super(props);
            this.getWrappedInstance = this.getWrappedInstance.bind(this);
            this.handleFormPreview = this.handleFormPreview.bind(this);
            this.handleFormSave = this.handleFormSave.bind(this);
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

        handleFormPreview() {
            this.getWrappedInstance().handleFormPreview();
        }

        handleFormSave() {
            this.getWrappedInstance().handleFormSave();
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

