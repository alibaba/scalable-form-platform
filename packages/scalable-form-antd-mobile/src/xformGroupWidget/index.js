/**
 * xform基础widget => 【分组】字段类型
 * 这个字段不需要提交value
 */

import React, {PureComponent} from 'react';
import classnames from 'classnames';

import './index.less';

export default class CustomGroupWidget extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'group');
    }

    render() {
        const {options} = this.props;
        const {groupName} = options;

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-group': true
            })}>
                <p className="group-name">{groupName}</p>
            </div>
        );
    }
}
