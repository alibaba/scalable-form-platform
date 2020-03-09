/**
 * xform自定义field template
 */

import React, {PureComponent} from 'react';
import {WhiteSpace} from 'antd-mobile';
import classnames from 'classnames';

export default class CustomFieldTemplate extends PureComponent {

    render() {
        const props = this.props;
        const {id, classNames, hidden, children, schema, rawHelp, disabled} = props;
        if (schema.type === 'object') {
            return (
                <div className={classNames + ' ' + 'xform-mobile-root'}>
                    {children}
                    <WhiteSpace size="md" />
                </div>
            );
        } else {
            let calClassNames = classNames + ' ' + 'xform-mobile-item';
            if (hidden) {
                calClassNames += (' ' + 'xform-hidden');
            }

            return (
                <div className={calClassNames}>
                    {children}
                    {rawHelp && <div
                        className={classnames({
                            'xform-help': true,
                            disabled
                        })}
                        dangerouslySetInnerHTML={{
                            __html: rawHelp
                        }}
                    />}
                    <WhiteSpace size="sm" />
                </div>
            );
        }
    }
}
