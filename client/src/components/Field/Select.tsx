import React from 'react';

import { Field } from './';

type SelectProps = {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
};

export const Select: React.FunctionComponent<SelectProps> = ({
  id,
  label,
  options,
}) => (
  <Field>
    <label htmlFor={id}>{label}: </label>
    <select id={id} name={id}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </Field>
);
