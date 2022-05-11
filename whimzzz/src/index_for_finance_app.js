import React from 'react';
import ReactDOM from 'react-dom';
import App from './json-converter/app.jsx';
import FinanceApp from './finance/app.jsx';
import Data from './data/data.json';
import Expense from './data/local/expense.js';
import LocalData from './data/local/sample.json';
import CSV from './data/local/csv.js';
import schema from './data/local/schema.json';


const finance = (
  <FinanceApp
    extra={ LocalData }
    data={ CSV }
    accounts={ [
      {
        id: '1',
        data: CSV
      },
      {
        id: '2',
        data: Expense
      }
    ] }
    schema={ schema }
  />
);



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


function compare() {
  const rent = 3472;


  const earlyTerm = rent *2;
  const responsible = (rent /2);


  const range = [];
  for (let i = 0; i < 3; i++) {
    range.push({
      month: i + 1,
      owe: rent * (i + 1) + responsible
    });
  }




  console.log('trial', {
    earlyTerm,
    responsible,
    range
  });

}



compare();





const converter = <App type="csv" source={ CSV } />;
// const converter = <App source={ test } />;

ReactDOM.render(
  finance,
  document.body.appendChild(document.createElement('div'))
);