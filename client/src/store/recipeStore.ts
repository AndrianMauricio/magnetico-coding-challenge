import { action, observable } from 'mobx';
import { assoc, dissoc, find, forEach, pathOr, prop, propEq } from 'ramda';
import uniqid from 'uniqid';

import allFormulations from './data/formulations.json';
import allRecipePresets from './data/formulations_ingredients.json';
import allIngredients from './data/ingredients.json';

export { allIngredients };

export type Ingredient = {
  id: number;
  name: string;
  minimum_percentage: number;
  maximum_percentage: number;
  description: string;
  classes: string[];
};

export class RecipeStore {
  @observable ingredients: {
    [id: string]: {
      data: Ingredient;
      amount: number;
    };
  } = {};

  @action addIngredient(ingredient?: Ingredient) {
    const newId = uniqid();

    this.ingredients[newId] = {
      data: ingredient ? ingredient : allIngredients[0],
      amount: ingredient
        ? ingredient.minimum_percentage
        : allIngredients[0].minimum_percentage,
    };
  }

  @action removeIngredient(id: string) {
    this.ingredients = dissoc(id, this.ingredients);
  }

  @action changeIngredient(id: string, ingredient: Ingredient) {
    const newIngredient = {
      data: {
        ...ingredient,
      },
      amount: this.trimAmount(
        pathOr(0, [id, "amount"], this.ingredients),
        ingredient
      ),
    };

    this.ingredients = assoc(id, newIngredient, this.ingredients);
  }

  @action changeAmount(id: string, value: number) {
    const ingredient = prop(id, this.ingredients);

    const updatedAmount = {
      ...ingredient,
      amount: this.trimAmount(value, prop("data", ingredient)),
    };

    this.ingredients = assoc(id, updatedAmount, this.ingredients);
  }

  @action setRecipePreset(presetId: number) {
    const newIngredientsList: {
      [id: string]: {
        data: Ingredient;
        amount: number;
      };
    } = {};

    const selectedPreset = find(propEq("id", presetId), this.recipePresets);

    forEach(ingredient => {
      newIngredientsList[uniqid()] = {
        data: ingredient.data!,
        amount: ingredient.amount,
      };
    }, selectedPreset!.ingredients);

    this.ingredients = newIngredientsList;
  }

  trimAmount = (amount: number, ingredient: Ingredient) => {
    const { maximum_percentage, minimum_percentage } = ingredient;

    if (amount > maximum_percentage) return maximum_percentage;
    if (amount < minimum_percentage) return minimum_percentage;
    return amount;
  };

  get recipePresets() {
    return [
      {
        id: 0,
        name: "No preset",
        ingredients: [],
      },
      ...allFormulations.map(recipe => {
        const presetIngredients = allRecipePresets.filter(
          preset => preset.formulation_id === recipe.id
        );

        const ingredients = presetIngredients.map(ingredient => ({
          data: find(propEq("id", ingredient.ingredient_id), allIngredients),
          amount: ingredient.percentage,
        }));

        return {
          ...recipe,
          ingredients,
        };
      }),
    ];
  }
}

export const recipeStore = new RecipeStore();
