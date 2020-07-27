import React from 'react';
import { useGetMessage } from 'scalable-form-tools';

interface Props {
  /**
   * 是否预览
   */
  isPreview: boolean;
  onTogglePreview: () => void;
}

/**
 * 是否预览表单切换
 * @param {Props} props
 * @returns {any}
 * @constructor
 */
function PreviewSwitch(props: Props) {
  const { isPreview } = props;
  const previewLabel = useGetMessage('xformPreviewOptName');
  const noPreviewLabel = useGetMessage('closeFormPreviewOptName', '关闭预览');
  return (
    <div className={`opt-item ${isPreview ? 'preview' : ''}`} onClick={props.onTogglePreview}>
      <div>
        <i className="opt-icon xform-iconfont">&#xe78f;</i>
        <span className="opt-name">{isPreview ? noPreviewLabel : previewLabel}</span>
      </div>
    </div>
  );
}

export default React.memo(PreviewSwitch);
