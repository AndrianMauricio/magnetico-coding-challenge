import React from 'react';

import { Input } from './Input';
import { Select } from './Select';

type FieldProps = {
  children: React.ReactNode;
};

const Field: React.FunctionComponent<FieldProps> = ({ children }) => (
  <div className="field">{children}</div>
);

export { Input, Select, Field };
