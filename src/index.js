import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@nurvus/ui';
import App from './json-converter/app.jsx';
import Data from './data/data.json';

// const App = () => {
//   return <Button>Your build is successful.</Button>;
// }

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
);