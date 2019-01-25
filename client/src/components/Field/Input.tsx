import React from 'react';

import { Field } from './';

type InputProps = {
  id: string;
  type: string;
  label: string;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
};

export const Input: React.FunctionComponent<InputProps> = ({
  id,
  type,
  label,
  ...props
}) => (
  <Field>
    <label htmlFor={id}>{label}: </label>
    <input type={type} id={id} name={id} {...props} />
  </Field>
);
