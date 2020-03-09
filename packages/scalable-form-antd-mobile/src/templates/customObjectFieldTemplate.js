/**
 * xform object类型自定义模板
 */

import React, {Component} from 'react';
import {List} from 'antd-mobile';
import classnames from 'classnames';

export default class CustomObjectFieldTemplate extends Component {

    render() {
        const props = this.props;
        const header = props.uiSchema["ui:title"] || props.title || '';
        const description = props.description;
        return (
            <List renderHeader={header} renderFooter={description}>
                {props.properties.map(prop => prop.content)}
            </List>
        );
    }
}
