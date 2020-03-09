/**
 * xform基础widget => boolean类型的checkbox组件（选中checkbox表示true，不选中表示false）
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, List} from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;

export default class CustomBooleanCheckbox extends PureComponent {

    componentDidMount() {
      const logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'boolean-checkbox');
    }

    render() {
        const {label, options, disabled, onChange, value} = this.props;
        return (
            <div className={classnames({
                'xform-custom-widget': true,
                'xform-custom-boolean-checkbox': true,
                disabled
            })}>
                <ListItem
                    wrap
                    multipleLine
                    extra={(
                        <Switch
                            checked={value}
                            disabled={disabled}
                            onChange={(checked) => {
                                onChange(checked);
                            }}
                            {...options}
                        />
                    )}>{label}</ListItem>
            </div>
        );
    }
}
