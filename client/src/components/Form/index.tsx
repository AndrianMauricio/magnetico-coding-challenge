import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { isEmpty } from 'ramda';
import React, { Component } from 'react';

import { PatientStore } from '../../store/patientStore';
import { RecipeStore } from '../../store/recipeStore';
import { GeneratedRecipe } from './GeneratedRecipe';
import { PatientForm } from './PatientForm';
import { RecipeForm } from './RecipeForm';

type FormProps = {
  patientStore: PatientStore;
  recipeStore: RecipeStore;
};

export const Form = observer(
  class Form extends Component<FormProps> {
    recipeGenerated = observable.box(false);
    formError = observable.box("");

    validateForm = () => {
      const { patientStore, recipeStore } = this.props;

      if (patientStore.name === "") {
        this.formError.set('Please, complete the "Name" field.');
      } else if (patientStore.address === "") {
        this.formError.set('Please, complete the "Address" field.');
      } else if (isEmpty(recipeStore.ingredients)) {
        this.formError.set("Please, add at lest one ingredient to the recipe.");
      } else {
        this.formError.set("");
      }
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      this.validateForm();

      if (this.formError.get() === "") {
        this.recipeGenerated.set(true);
      }
    };

    render() {
      const { patientStore, recipeStore } = this.props;

      return (
        <>
          <form onSubmit={this.handleSubmit} className="patient-form">
            <PatientForm patientStore={patientStore} />
            <RecipeForm recipeStore={recipeStore} />
            <button type="submit">Generate PDF</button>
            <button
              type="button"
              onClick={window.print}
              disabled={!this.recipeGenerated.get()}
            >
              Print PDF
            </button>
          </form>
          {this.formError.get() !== "" && (
            <div className="form-error">{this.formError.get()}</div>
          )}
          {this.recipeGenerated.get() && (
            <GeneratedRecipe
              patientStore={patientStore}
              recipeStore={recipeStore}
            />
          )}
        </>
      );
    }
  }
);
