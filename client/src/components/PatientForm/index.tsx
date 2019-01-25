import './PatientForm.scss';

import React from 'react';

import { Field, Input, Select } from '../Field';
import { Ingredient } from '../Ingredient';

export const PatientForm: React.FunctionComponent = _ => (
  <form onSubmit={e => e.preventDefault()} className="patientForm">
    <Input id="name" type="text" label="Name" />
    <Input id="address" type="text" label="Address" />
    <Input id="dateOfBirth" type="date" label="Date Of Birth" />
    <Select
      id="preset"
      label="Select a preset"
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
    />
    <Field>
      Or add an ingredient: <button type="button">+</button>
    </Field>
    <Ingredient
      id="1"
      value="15"
      onChange={e => console.log((e.target as HTMLInputElement).value)}
    />
    <Ingredient
      id="2"
      value="15"
      onChange={e => console.log((e.target as HTMLInputElement).value)}
    />
    <Ingredient
      id="3"
      value="15"
      onChange={e => console.log((e.target as HTMLInputElement).value)}
    />
    <button type="submit">Generate PDF</button>
  </form>
);
