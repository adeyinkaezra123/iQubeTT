import { AutoFormInputComponentProps } from "../types";
import AutoFormInput from "./input";

export default function AutoFormArray({
  fieldProps,
  ...props
}: AutoFormInputComponentProps) {
  return (
    <AutoFormInput
      fieldProps={{
        ...fieldProps,
      }}
      {...props}
    />
  );
}
