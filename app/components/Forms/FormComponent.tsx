import React, { FunctionComponent, HTMLProps } from "react";

type Props = {
  label?: string;
  name: string;
  error?: string;
  field: FunctionComponent<HTMLProps<HTMLInputElement>>;
  fieldProps?: HTMLProps<HTMLInputElement>;
};
const FormComponent: React.FC<Props> = ({
  label,
  name,
  error,
  field,
  fieldProps,
}) => {
  if (label === undefined) label = name.charAt(0).toUpperCase() + name.slice(1);
  const id = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>

      {React.createElement(field, {
        name,
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        ...fieldProps,
      } as React.HTMLProps<HTMLInputElement>)}

      {error ? (
        <p role="alert" id={errorId} className="text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FormComponent;
