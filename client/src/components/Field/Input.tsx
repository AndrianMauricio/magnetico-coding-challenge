import React from 'react';

import { Field } from './';

type InputProps = {
  id: string;
  type: string;
  label: React.ReactNode;
  value?: string | number;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
  required?: boolean;
  step?: string;
};

export const Input: React.FunctionComponent<InputProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  ...props
}) => (
  <Field>
    <label htmlFor={id}>{label}: </label>
    <input
      type={type}
      id={id}
      name={id}
      onChange={onChange}
      value={value}
      {...props}
    />
  </Field>
);
