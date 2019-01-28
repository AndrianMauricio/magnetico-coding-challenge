import './IngredientField.scss';

import React from 'react';

import { Ingredient } from '../../../store/recipeStore';
import { Input, Select } from '../../Field';

type IngredientFieldProps = {
  id: number | string;
  ingredient: {
    data: Ingredient;
    amount: number;
  };
  ingredients: Ingredient[];
  onChangeAmount: (e: React.FormEvent<HTMLInputElement>) => void;
  onChangeIngredient: (e: React.FormEvent<HTMLSelectElement>) => void;
  onRemoveIngredient: (e: React.FormEvent<HTMLButtonElement>) => void;
};

export const IngredientField: React.FunctionComponent<IngredientFieldProps> = ({
  id,
  ingredient,
  ingredients,
  onChangeAmount,
  onChangeIngredient,
  onRemoveIngredient,
}) => (
  <div className="ingredient">
    <Select
      id={`selectIngredient${id}`}
      label="Ingredient"
      options={ingredients.map(ingredient => ({
        value: ingredient.id,
        label: ingredient.name,
      }))}
      onChange={onChangeIngredient}
      value={ingredient.data.id}
      required
    />
    <Input
      id={`amountIngredient${id}`}
      type="number"
      label={
        <>
          Amount{" "}
          <span>
            ({ingredient.data.minimum_percentage}% -{" "}
            {ingredient.data.maximum_percentage}%)
          </span>
        </>
      }
      min={ingredient.data.minimum_percentage}
      max={ingredient.data.maximum_percentage}
      value={ingredient.amount}
      onChange={onChangeAmount}
      step="0.01"
      required
    />
    <button type="button" onClick={onRemoveIngredient}>
      🗑
    </button>
  </div>
);
