import React from 'react';

import { Input, Select } from './Field';

type IngredientProps = {
  id: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

export const Ingredient: React.FunctionComponent<IngredientProps> = ({
  id,
  value,
  onChange,
}) => (
  <div className="ingredient">
    <Select
      id={`selectIngredient${id}`}
      label="Ingredient"
      options={[
        { value: "ingredient1", label: "Ingredient 1" },
        { value: "ingredient2", label: "Ingredient 2" },
        { value: "ingredient3", label: "Ingredient 3" },
      ]}
    />
    <Input
      id={`amountIngredient${id}`}
      type="number"
      label="Amount"
      min="10"
      max="20"
      onChange={onChange}
      value={value}
    />
  </div>
);
