/**
 * xform自定义field template
 */

import React, {Component} from 'react';
import {Row, Col, Tooltip} from 'antd';
import classnames from 'classnames';

export default class CustomFieldTemplate extends Component {

    render() {
        const props = this.props;
        //formContext中存放着类似formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 18 }}的配置
        const {id, classNames, label, required, hidden, description, children, rawHelp, formContext, schema, uiSchema} = props;
        // 这个idPrefix决定所有字段的id的前缀，与react-jsonschema-form组件中的idPrefix属性相同https://github.com/mozilla-services/react-jsonschema-form#id-prefix
        const idPrefix = 'root';
        const code = id.slice(idPrefix.length + 1);
        let labelCol = formContext.labelCol.span || 6;
        let wrapperCol = formContext.wrapperCol.span || 18;
        let labelType = formContext.labelType || 'inline';
        let alignType = formContext.alignType || 'vertical';
        let labelAlign = formContext.labelAlign || 'left';
        let itemNumberInRow = formContext.itemNumberInRow || 2;
        let isBooleanCheckbox = (schema.type === 'boolean' && typeof uiSchema['ui:widget'] === 'undefined');

        if (labelType === 'inline') {
            // labelType为inline的场景下才有labelAlign、alignType、itemNumberInRow配置
            if (alignType === 'vertical') {
                if (schema.type === 'object') {
                    return (
                        <div className={classNames + ' ' + 'xform-root'}>
                            {children}
                        </div>
                    );
                } else {
                    let calClassNames = classNames + ' ' + 'xform-item';
                    if (hidden) {
                        calClassNames += (' ' + 'xform-hidden');
                    }

                    if (typeof label === 'string' && label !== '' && label !== code) {
                        return (
                            <div className={calClassNames}>
                                <Row type="flex" align="top">
                                    <Col span={labelCol} style={{
                                        textAlign: labelAlign,
                                        visibility: isBooleanCheckbox ? 'hidden' : 'visible',
                                        maxHeight: isBooleanCheckbox ? '20px' : 'auto',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <Tooltip title={label}>
                                            <label htmlFor={id} className={classnames({
                                                'control-label': true,
                                                'ant-form-item-label': true,
                                                'required': required
                                            })}>{label}</label>
                                        </Tooltip>
                                    </Col>
                                    <Col span={wrapperCol}>
                                        {description}
                                        {children}
                                        <div className="xform-help" dangerouslySetInnerHTML={{
                                            __html: rawHelp
                                        }} />
                                    </Col>
                                </Row>
                            </div>
                        );
                    } else {
                        return (
                            <div className={calClassNames}>
                                {description}
                                {children}
                                <div className="xform-help" dangerouslySetInnerHTML={{
                                    __html: rawHelp
                                }} />
                            </div>
                        );
                    }
                }
            } else if (alignType === 'inline') {
                if (schema.type === 'object') {
                    return (
                        <div className={classNames + ' ' + 'xform-root'}>
                            {children}
                        </div>
                    );
                } else {
                    let calClassNames = classNames + ' ' + 'xform-item';
                    if (hidden) {
                        calClassNames += (' ' + 'xform-hidden');
                    }
                    if (typeof label === 'string' && label !== '' && label !== code) {
                        return (
                            <div
                                className={calClassNames}
                                style={{
                                    display: 'inline-block',
                                    width: (Math.floor(100 / itemNumberInRow) + '%')
                                }}
                            >
                                <Row type="flex" align="top">
                                    <Col span={labelCol} style={{
                                        textAlign: labelAlign,
                                        visibility: isBooleanCheckbox ? 'hidden' : 'visible',
                                        maxHeight: isBooleanCheckbox ? '20px' : 'auto',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <Tooltip title={label}>
                                            <label htmlFor={id} className={classnames({
                                                'ant-form-item-label': true,
                                                'control-label': true,
                                                'required': required
                                            })}>{label}</label>
                                        </Tooltip>
                                    </Col>
                                    <Col span={wrapperCol}>
                                        {description}
                                        {children}
                                        <div className="xform-help" dangerouslySetInnerHTML={{
                                            __html: rawHelp
                                        }} />
                                    </Col>
                                </Row>
                            </div>
                        );
                    } else {
                        return (
                            <div className={calClassNames}>
                                {description}
                                {children}
                                <div className="xform-help" dangerouslySetInnerHTML={{
                                    __html: rawHelp
                                }} />
                            </div>
                        );
                    }
                }
            }
        } else {
            if (schema.type === 'object') {
                return (
                    <div className={classNames + ' ' + 'xform-root'}>
                        {children}
                    </div>
                );
            } else {
                let calClassNames = classNames + ' ' + 'xform-item';
                if (hidden) {
                    calClassNames += (' ' + 'xform-hidden');
                }
                if (typeof label === 'string' && label !== '' && label !== code) {
                    return (
                        <div className={calClassNames}>
                            <label htmlFor={id} className={classnames({
                                'xform-hidden': isBooleanCheckbox,
                                'control-label': true,
                                'ant-form-item-label': true,
                                'required': required
                            })}>{label}</label>
                            {description}
                            {children}
                            <div className="xform-help" dangerouslySetInnerHTML={{
                                __html: rawHelp
                            }} />
                        </div>
                    );
                } else {
                    return (
                        <div className={calClassNames}>
                            {description}
                            {children}
                            <div className="xform-help" dangerouslySetInnerHTML={{
                                __html: rawHelp
                            }} />
                        </div>
                    );
                }
            }
        }
    }
}
