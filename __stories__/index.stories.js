import {storiesOf} from '@storybook/react';
import * as React from 'react';
import './index.less';
import ScalableFormCoreExample from './ScalableFormCoreExample';
import ScalableFormCoreWithCodeExample from './ScalableFormCoreWithCodeExample';
import ScalableFormAntdWithCodeExample from './ScalableFormAntdWithCodeExample';
import ScalableFormAntdInlineExample from './ScalableFormAntdInlineExample';
import ScalableFormAntdExample from './ScalableFormAntdExample';
import ScalableFormMobileWithCodeExample from './ScalableFormMobileWithCodeExample';
import ScalableFormMobileExample from './ScalableFormMobileExample';
import ScalableFormEditorWithCodeExample from './ScalableFormEditorWithCodeExample';
import ScalableFormEditorWithSchema from './ScalableFormEditorWithSchema';

const storiesWithAntd = storiesOf('使用AntDesign', module);
const storiesWithAntdMobile = storiesOf('使用AntDesignMobile', module);
const storiesWithEditor = storiesOf('表单编辑器', module);
const storiesWithHTML = storiesOf('HTML原生UI', module);

storiesWithAntd.add(
  '使用schema的表单',
  () => {
    return (
      <ScalableFormAntdExample />
    );
  }
);

storiesWithAntd.add(
  '使用formCode',
  () => {
    return (
      <ScalableFormAntdWithCodeExample />
    );
  }
);

storiesWithAntd.add(
  '内联样式表单',
  () => {
    return (
      <ScalableFormAntdInlineExample />
    );
  }
);

storiesWithAntdMobile.add(
  '使用schema',
  () => {
    return (
      <ScalableFormMobileExample />
    );
  }
);

storiesWithAntdMobile.add(
  '使用formCode',
  () => {
    return (
      <ScalableFormMobileWithCodeExample />
    );
  }
);

storiesWithEditor.add(
  '使用schema',
  () => {
    return (
      <ScalableFormEditorWithSchema />
    );
  }
);

storiesWithEditor.add(
  '使用formCode',
  () => {
    return (
      <ScalableFormEditorWithCodeExample />
    );
  }
);

storiesWithHTML.add(
  '使用schema',
  () => {
    return (
      <ScalableFormCoreExample />
    );
  }
);

storiesWithHTML.add(
  '使用formCode',
  () => {
    return (
      <ScalableFormCoreWithCodeExample />
    );
  }
);


