import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@unfocused/nurvus-ui';
import Spawn from '@unfocused/spawn';
import Data from './data/data.json';
import './index.scss';

const App = () => {
  return (
    <div>
      <Button>Your build is successful.</Button>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.body.appendChild(Spawn({
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }))
);