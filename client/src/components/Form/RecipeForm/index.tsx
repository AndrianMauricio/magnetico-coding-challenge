import './RecipeForm.scss';

import { observer } from 'mobx-react';
import { find, propEq } from 'ramda';
import React, { Component } from 'react';

import { allIngredients, Ingredient, RecipeStore } from '../../../store/recipeStore';
import { Field, Select } from '../../Field';
import { IngredientField } from './IngredientField';

type RecipeFormProps = {
  recipeStore: RecipeStore;
};

export const RecipeForm = observer(
  class RecipeForm extends Component<RecipeFormProps, {}> {
    changeAmount = (id: string) => (e: React.FormEvent<HTMLInputElement>) => {
      const { recipeStore } = this.props;

      const value = parseFloat((e.target as HTMLInputElement).value);

      recipeStore.changeAmount(id, value);
    };

    changeIngredient = (id: string) => (
      e: React.FormEvent<HTMLSelectElement>
    ) => {
      const { recipeStore } = this.props;
      const toIngredientId = parseInt((e.target as HTMLSelectElement).value);
      const toIngredient = find(propEq("id", toIngredientId), allIngredients);
      toIngredient && recipeStore.changeIngredient(id, toIngredient);
    };

    removeIngredient = (id: string) => (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      const { recipeStore } = this.props;
      recipeStore.removeIngredient(id);
    };

    setPreset = (e: React.FormEvent<HTMLSelectElement>) => {
      const { recipeStore } = this.props;
      const presetId = parseInt((e.target as HTMLSelectElement).value);
      recipeStore.setRecipePreset(presetId);
    };

    render() {
      const { recipeStore } = this.props;
      return (
        <div className="recipe-form">
          <Select
            id="preset"
            label="Select a preset"
            options={recipeStore.recipePresets.map(preset => ({
              value: preset.id,
              label: preset.name,
            }))}
            onChange={this.setPreset}
          />
          <Field>
            <label>Or add an ingredient: </label>
            <button type="button" onClick={_ => recipeStore.addIngredient()}>
              +
            </button>
          </Field>
          {Object.entries(recipeStore.ingredients).map(([id, ingredient]) => (
            <IngredientField
              key={id}
              id={id}
              ingredient={ingredient}
              ingredients={allIngredients}
              onChangeAmount={this.changeAmount(id)}
              onChangeIngredient={this.changeIngredient(id)}
              onRemoveIngredient={this.removeIngredient(id)}
            />
          ))}
        </div>
      );
    }
  }
);
