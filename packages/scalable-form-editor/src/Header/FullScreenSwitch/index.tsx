import React from 'react';
import { useGetMessage } from 'scalable-form-tools';

interface FullScreenSwitchProps {
  /**
   * 是否全屏标记
   */
  isFullscreen: boolean;
  onToggleFullScreen: () => void;
}

/**
 * 全屏切换
 * @param {FullScreenSwitchProps} props
 * @returns {any}
 * @constructor
 */
const FullScreenSwitch: React.FC<FullScreenSwitchProps> = (props: FullScreenSwitchProps) => {
  const { isFullscreen } = props;
  const noFullScreenOptName = useGetMessage('xformNoFullScreenOptName');
  const fullScreenOptName = useGetMessage('xformFullScreenOptName');
  return (
    <div className="opt-item" onClick={props.onToggleFullScreen}>
      {(() => {
        if (isFullscreen) {
          return (
            <div>
              <i className="opt-icon xform-iconfont">&#xe67c;</i>
              <span className="opt-name">{noFullScreenOptName}</span>
            </div>
          );
        } else {
          return (
            <div>
              <i className="opt-icon xform-iconfont">&#xe67b;</i>
              <span className="opt-name">{fullScreenOptName}</span>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default React.memo(FullScreenSwitch);
