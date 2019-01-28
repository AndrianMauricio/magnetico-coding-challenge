import { action, observable } from 'mobx';
import moment from 'moment';

export class PatientStore {
  @observable name = "";
  @observable address = "";
  @observable dateOfBirth = moment().format("YYYY-MM-DD");

  @action changeName(value: string) {
    this.name = value;
  }

  @action changeAddress(value: string) {
    this.address = value;
  }

  @action changeDateOfBirth(value: string) {
    this.dateOfBirth = value;
  }
}

export const patientStore = new PatientStore();
