import * as React from "react";
import { type FieldPath, type FieldValues, type FieldErrors } from "react-hook-form";

export type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName;
  error?: FieldErrors;
};

export const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);