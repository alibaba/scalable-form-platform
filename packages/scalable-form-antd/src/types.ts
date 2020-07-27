import { ScalableFormCoreProps } from 'scalable-form-core';

enum LayoutType {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export interface BaseFormContext {
  popupContainer?: (node?: HTMLElement) => HTMLElement;
  labelType?: LayoutType;
  vertical?: boolean;
  customUploadRequest?: (file: File) => Promise<string>;
  onImagePreview?: (url: string) => void;
}

export type ScalableFormAntdProps<
  FormData = any,
  FormContext extends BaseFormContext = BaseFormContext
> = ScalableFormCoreProps<FormData, FormContext>;
