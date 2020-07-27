import React from 'react';
import { WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { useGetMessage } from 'scalable-form-tools';

interface Props {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * 默认提交按钮
 * @param {Props} props
 * @returns {any}
 * @constructor
 */
const SubmitButton: React.FC<Props> = (props: Props) => {
  return (
    <div className="scalable-form-submit-button">
      <WhiteSpace size="lg" />
      <WingBlank size="md">
        <Button type="primary" onClick={props.onClick}>
          {useGetMessage('xformDefaultSubmitButtonLabel')}
        </Button>
      </WingBlank>
      <WhiteSpace size="lg" />
    </div>
  );
};

SubmitButton.displayName = 'SubmitButton';
export default React.memo(SubmitButton);
