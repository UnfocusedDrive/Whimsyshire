import React from 'react';
import ReactDOM from 'react-dom';
import App from './json-converter/app.jsx';
import FinanceApp from './finance/app.jsx';
import Data from './data/data.json';
import LocalData from './data/local/shhh.json';
import CSV from './data/local/csv.js';


// const finance = <FinanceApp data={ LocalData } />;



const test = `[
  {
    label: 'Warp Gate',
    description: 'Sample App Template',
    path: '../warp-gate/index.js',
    route: 'warp-gate'
  },
  {
    label: 'Spawn Table',
    description: 'Using Spawn Engine with sample APIs.',
    path: '../spawn-table/index.js',
    route: 'spawn-table'
  },
  {
    label: 'JS Calculator',
    description: ' sjlfs f jasdlf jkasf lkdj',
    path: '../js-calculator/index.js',
    route: 'js-calculator'
  },
  {
    label: 'Kombat JS',
    description: ' sjlfs f jasdlf jkasf lkdj'
  },
  {
    label: 'Muck',
    description: ' sjlfs f jasdlf jkasf lkdj',
    path: '../muck/index.js',
    route: 'muck'
  }
]`;






const converter = <App type="csv" source={ CSV } />;
// const converter = <App source={ test } />;

ReactDOM.render(
  converter,
  document.body.appendChild(document.createElement('div'))
);