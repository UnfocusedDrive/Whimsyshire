import React from 'react';


export default function App({ data }) {
  const { income, expense } =  data;
  const incomeTotal = income.reduce((prevValue, nextValue) => prevValue + nextValue.value, 0);
  const expenseTotal = expense.reduce((prevValue, nextValue) => prevValue + nextValue.value, 0);


  const net = incomeTotal - expenseTotal;


  console.log('data', net, {expenseTotal, incomeTotal}, data);

  return <div />;

}