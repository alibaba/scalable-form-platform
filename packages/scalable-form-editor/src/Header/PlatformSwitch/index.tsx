import React from 'react';
import { Popover, Radio } from 'antd';
import { Locale, Platform, useGetMessage } from 'scalable-form-tools';
import './index.less';

const RadioGroup = Radio.Group;

interface Props {
  /**
   * 当前platform
   */
  platform: Platform;
  /**
   * 当前语言
   */
  locale: Locale;
  onUpdatePlatform: (newPlatform: Platform) => void;
}

/**
 * 切换配置平台（PC/移动/both）
 * @param {Props} props
 * @returns {any}
 * @constructor
 */
function PlatformPopover(props: Props) {
  let icon = '&#xe842;';
  const platformOptName = useGetMessage('xformChangePlatformOptName');
  const platformBothName = useGetMessage('xformChangePlatformBothName');
  const platformMobileName = useGetMessage('xformChangePlatformMobileName');
  const platformPCName = useGetMessage('xformChangePlatformPCName');
  let name = platformOptName;
  if (props.platform === Platform.BOTH) {
    icon = '&#xe683;';
    name = platformBothName;
  } else if (props.platform === Platform.LAP) {
    icon = '&#xe842;';
    name = platformPCName;
  } else if (props.platform === Platform.MOBILE) {
    icon = '&#xe7b2;';
    name = platformMobileName;
  }
  /* eslint-disable react/no-danger */
  return (
    <Popover
      title={null}
      content={
        <div className="platform-change-wrapper">
          <RadioGroup
            value={props.platform}
            onChange={(event) => {
              const { value } = event.target;
              props.onUpdatePlatform(value);
            }}
          >
            <Radio className="platform-line" value="laptop">
              <i className="xform-iconfont platform-icon">&#xe842;</i>
              <span className="platform-name">{platformPCName}</span>
            </Radio>
            <Radio className="platform-line" value="mobile">
              <i className="xform-iconfont platform-icon">&#xe7b2;</i>
              <span className="platform-name">{platformMobileName}</span>
            </Radio>
            <Radio className="platform-line" value="both">
              <i className="xform-iconfont platform-icon">&#xe683;</i>
              <span className="platform-name">{platformBothName}</span>
            </Radio>
          </RadioGroup>
        </div>
      }
      placement="bottomLeft"
      trigger={'click'}
      overlayClassName="scalable-form-builder-platform-change-popover"
    >
      <div className="opt-item">
        <i className="opt-icon xform-iconfont" dangerouslySetInnerHTML={{ __html: icon }} />
        <span className="opt-name">{name}</span>
      </div>
    </Popover>
  );
  /* eslint-enable react/no-danger */
}

export default React.memo(PlatformPopover);
