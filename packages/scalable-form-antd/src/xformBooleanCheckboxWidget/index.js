/**
 * xform基础widget => boolean类型的checkbox组件（选中checkbox表示true，不选中表示false）
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import classnames from 'classnames';

export default class CustomBooleanCheckbox extends Component {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'boolean-checkbox');
    }

    render() {
        let label = this.props.label,
            options = this.props.options,
            disabled = this.props.disabled,
            onChange = this.props.onChange,
            value = this.props.value;
        return (
            <div className={classnames({
                'xform-custom-widget': true,
                'xform-custom-boolean-checkbox': true
            })}>
                <Checkbox
                    checked={value}
                    disabled={disabled}
                    onChange={(event) => {
                        onChange(event.target.checked);
                    }}
                    {...options}
                >{label}</Checkbox>
            </div>
        );

    }
}
