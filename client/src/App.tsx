import React from 'react';

import { Form } from './components/Form';
import { patientStore, recipeStore } from './store';

const App: React.FunctionComponent<{}> = _ => (
  <Form patientStore={patientStore} recipeStore={recipeStore} />
);

export default App;
