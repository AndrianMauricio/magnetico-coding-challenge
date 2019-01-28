import './GeneratedRecipe.scss';

import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { PatientStore } from '../../../store/patientStore';
import { RecipeStore } from '../../../store/recipeStore';

type GeneratedRecipeProps = {
  patientStore: PatientStore;
  recipeStore: RecipeStore;
};

export const GeneratedRecipe = observer(
  class GeneratedRecipe extends Component<GeneratedRecipeProps> {
    render() {
      const { patientStore, recipeStore } = this.props;
      return (
        <div id="generated-recipe">
          <h1>Recipe</h1>
          <section className="patient-information">
            <h3>Patient Information</h3>
            <p>Name: {patientStore.name}</p>
            <p>Address: {patientStore.address}</p>
            <p>Date of Birth: {patientStore.dateOfBirth}</p>
          </section>
          <section className="recipe-information">
            <h3>Recipe Information</h3>
            <ul>
              {Object.values(recipeStore.ingredients).map(
                ({ data, amount }) => (
                  <li>
                    {data.name}: {amount}%
                  </li>
                )
              )}
            </ul>
          </section>
        </div>
      );
    }
  }
);
