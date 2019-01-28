import './Field.scss';

import React from 'react';

type FieldProps = {
  children: React.ReactNode;
};

export const Field: React.FunctionComponent<FieldProps> = ({ children }) => (
  <div className="field">{children}</div>
);
