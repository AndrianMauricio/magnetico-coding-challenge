import { action, observable } from 'mobx';
import { assoc, dissoc, pathOr, prop } from 'ramda';
import uniqid from 'uniqid';

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

  trimAmount = (amount: number, ingredient: Ingredient) => {
    const { maximum_percentage, minimum_percentage } = ingredient;

    if (amount > maximum_percentage) return maximum_percentage;
    if (amount < minimum_percentage) return minimum_percentage;
    return amount;
  };
}

export const recipeStore = new RecipeStore();
