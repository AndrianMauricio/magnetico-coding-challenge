import './PatientForm.scss';

import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { PatientStore } from '../../../store/patientStore';
import { Input } from '../../Field';

type PatientFormProps = {
  patientStore: PatientStore;
};

export const PatientForm = observer(
  class PatientForm extends Component<PatientFormProps, {}> {
    handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
      this.props.patientStore.changeName((e.target as HTMLInputElement).value);
    };

    handleChangeAddress = (e: React.FormEvent<HTMLInputElement>) => {
      this.props.patientStore.changeAddress(
        (e.target as HTMLInputElement).value
      );
    };

    handleChangeDateOfBirth = (e: React.FormEvent<HTMLInputElement>) => {
      this.props.patientStore.changeDateOfBirth(
        (e.target as HTMLInputElement).value
      );
    };

    render() {
      const { patientStore } = this.props;

      return (
        <>
          <Input
            id="name"
            type="text"
            label="Name"
            value={patientStore.name}
            onChange={this.handleChangeName}
            required
          />
          <Input
            id="address"
            type="text"
            label="Address"
            value={patientStore.address}
            onChange={this.handleChangeAddress}
            required
          />
          <Input
            id="dateOfBirth"
            type="date"
            label="Date Of Birth"
            value={patientStore.dateOfBirth}
            onChange={this.handleChangeDateOfBirth}
            required
          />
        </>
      );
    }
  }
);
