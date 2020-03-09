/**
 * 编辑器顶部操作栏：切换当前配置的端浮层组件
 * @props: visible（popover是否显示） platform（当前选中的端，laptop：PC端；mobile：手机端；both：两者通用） platformChangeHandler（端切换处理回调方法） platformVisibleChangeHandler（popover的onVisibleChange处理器）
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Popover, Radio} from 'antd';

import './index.less';
import {getMessageId} from '../../i18n/localeMessages';

const RadioGroup = Radio.Group;

export default function PlatformPopover(props) {
    const {visible, platform, platformChangeHandler, platformVisibleChangeHandler, children, messages, popupContainer} = props;
    return (
        <Popover
            title=""
            content={(
                <div className="platform-change-wrapper">
                    <RadioGroup value={platform} onChange={(event) => {
                        const value = event.target.value;
                        platformChangeHandler(value);
                    }}>
                        <Radio className="platform-line" value="laptop">
                            <i className="xform-iconfont platform-icon">&#xe842;</i>
                            <span className="platform-name">{messages[getMessageId('xformChangePlatformPCName')]}</span>
                        </Radio>
                        <Radio className="platform-line" value="mobile">
                            <i className="xform-iconfont platform-icon">&#xe7b2;</i>
                            <span className="platform-name">{messages[getMessageId('xformChangePlatformMobileName')]}</span>
                        </Radio>
                        <Radio className="platform-line" value="both">
                            <i className="xform-iconfont platform-icon">&#xe683;</i>
                            <span className="platform-name">{messages[getMessageId('xformChangePlatformBothName')]}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            )}
            visible={visible}
            onVisibleChange={platformVisibleChangeHandler}
            trigger="click"
            placement="bottomLeft"
            overlayClassName="app-xform-builder-platform-change-popover"
            getPopupContainer={popupContainer}
        >
            {children}
        </Popover>
    );
}

PlatformPopover.propTypes = {
    messages: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool.isRequired,
    platform: PropTypes.oneOf(['laptop', 'mobile', 'both']).isRequired,
    platformChangeHandler: PropTypes.func.isRequired,
    platformVisibleChangeHandler: PropTypes.func.isRequired,
    popupContainer: PropTypes.func.isRequired
};


