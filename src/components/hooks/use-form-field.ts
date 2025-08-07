import * as React from "react";
import { FormFieldContext, type FormFieldContextValue } from "../lib/form-context";
import { FormItemContext } from "../lib/form-item-context";

type UseFormFieldReturn = {
  id: string;
  name: FormFieldContextValue['name'];
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  error?: FormFieldContextValue['error'];
};

export function useFormField(): UseFormFieldReturn {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  // Assert non-nullability after checks
  const nonNullFieldContext = fieldContext!;
  const nonNullItemContext = itemContext!;

  const { id } = nonNullItemContext;

  return {
    id,
    name: nonNullFieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: nonNullFieldContext.error,
  };
}