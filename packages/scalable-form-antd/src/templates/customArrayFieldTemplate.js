/**
 * xform自定义Array类型模板
 */

import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import classnames from 'classnames';
import {If, Then} from 'react-if';

export default class CustomArrayFieldTemplate extends Component {

    _getValidateMessage(errorType, validate) {
        let errorMessage = '';
        validate.map((validateItem) => {
            if (validateItem.type === errorType) {
                errorMessage = validateItem.message;
                return false;
            }
        });
        return errorMessage;
    }

    render() {
        const props = this.props;
        const {uiSchema} = props;

        const options = uiSchema['ui:options'] || {};

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        return (
            <div className={props.className + ' xform-array-field'}>
                <div className={classnames({
                    'ant-form-item-control': true,
                    'xform-custom-widget': true,
                    'xform-custom-array': true,
                    'has-error': _errorType !== ''
                })}>
                    {props.items && props.items.map(element => (
                        <div className="xform-array-field-item" key={element.key || element.index}>
                            <div>{element.children}</div>
                            <div className="xform-array-buttons">
                                {element.hasMoveDown && (
                                    <Button size="small" type="default" onClick={element.onReorderClick(element.index, element.index + 1)}>
                                        <Icon type="arrow-down" />
                                    </Button>
                                )}
                                {element.hasMoveUp && (
                                    <Button size="small" type="default" onClick={element.onReorderClick(element.index, element.index - 1)}>
                                        <Icon type="arrow-up" />
                                    </Button>
                                )}
                                <If condition={props.items.length > 1}>
                                    <Then>
                                        <Button size="small" type="default" onClick={element.onDropIndexClick(element.index)}>
                                            <Icon type="close" />
                                        </Button>
                                    </Then>
                                </If>
                            </div>
                        </div>
                    ))}

                    {props.canAdd && (
                        <div className="xform-array-bottom">
                            <Button size="small" type="primary" onClick={props.onAddClick}>
                                <Icon type="plus" />
                            </Button>
                        </div>
                    )}
                    <div className="ant-form-explain">{validateMessage}</div>
                </div>
            </div>
        );
    }
}
