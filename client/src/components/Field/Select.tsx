import React from 'react';

import { Field } from './';

type SelectProps = {
  id: string;
  label: string;
  options: {
    value: string | number;
    label: string;
  }[];
  value?: string | number;
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

export const Select: React.FunctionComponent<SelectProps> = ({
  id,
  label,
  options,
  ...props
}) => (
  <Field>
    <label htmlFor={id}>{label}: </label>
    <select id={id} name={id} {...props}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </Field>
);
