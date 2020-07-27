import React from 'react';
import { Locale, Platform } from 'scalable-form-tools';
import './index.less';
import PlatformSwitch from './PlatformSwitch';
import FullScreenSwitch from './FullScreenSwitch';
import PreviewSwitch from './PreviewSwitch';

interface Props {
  /**
   * 是否全屏标记
   */
  isFullscreen: boolean;
  /**
   * 是否预览
   */
  isPreview: boolean;
  /**
   * 当前platform
   */
  platform: Platform;
  /**
   * 当前语言
   */
  locale: Locale;
  onToggleFullScreen: () => void;
  onTogglePreview: () => void;
  onUpdatePlatform: (newPlatform: Platform) => void;
}

/**
 * 表单编辑器顶部header
 * @param {Props} props
 * @returns {any}
 * @constructor
 */
function Header(props: Props) {
  return (
    <div className="scalable-form-builder-header">
      <PlatformSwitch locale={props.locale} platform={props.platform} onUpdatePlatform={props.onUpdatePlatform} />
      <div className="header-divider" />
      <PreviewSwitch isPreview={props.isPreview} onTogglePreview={props.onTogglePreview} />
      <FullScreenSwitch isFullscreen={props.isFullscreen} onToggleFullScreen={props.onToggleFullScreen} />
    </div>
  );
}

export default React.memo(Header);
