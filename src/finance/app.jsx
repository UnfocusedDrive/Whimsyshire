import { filter } from 'lodash';
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CONVERTER from '../json-converter/csv-to-json';

const CONSTANT = {
  AMOUNT: 'Amount',
  DATE: 'Posting Date',
  DATE2: 'Post Date'
};


function getMonthBalance(data) {
  let startVal = 0;
  const data2 = data.reverse().map(row => {
    const rowBalance = parseFloat(row.Amount);
    const nextBalance = startVal + rowBalance;
    startVal = nextBalance;
    // console.log('nextBalance', rowBalance);
    return {
      ...row,
      monthBalance: nextBalance
    }
  });

  return data2;
}

function getTransactions(sourceTransactions, account = {}) {
  let transactions=[];
  if (account.filter) {
    account.filter.forEach(f => {
      transactions = [
        ...transactions,
        ...getLastXTrans(sourceTransactions, f.label, f.count)
      ];
    });
  } else if (account.reverseFilter) {
    account.reverseFilter.forEach(f => {
      transactions = [
        ...transactions,
        ...sourceTransactions.filter(t => {
          return t[f.dataKey] !== f.value;
        })
      ];

    });
  } else {
    transactions = sourceTransactions;
  }

  return transactions;
}

function getFormattedData(schema, accounts) {
  return schema.accounts.map(account => {
    const { dateKey } = account;
    const source = accounts.filter(acc => acc.id === account.id)[0];
    const lastMonthTransactions = getLastMonthTransactions(source.data, dateKey);
    const transactions = getTransactions(lastMonthTransactions, account)
    const total = getTotal(transactions);

    let history = [];
    if (account.history) {
      for (let i = 0; i < account.history; i++) {
        const trans = getLastMonthTransactions(source.data, dateKey, i + 1);
        const filtered = getTransactions(trans, account);
        const t = getTotal(filtered);
        history.push({
          transactions: filtered,
          total: t
        })
      }
    }

    const accountData = {
      label: account.label,
      total,
      transactions,
      history,
      lastMonthTransactions,
      source,
      schema: account
    };

    return accountData;


  });
}

function getLastXTrans(data, name, amt = 1) {
  return data.filter(row => row.Description.indexOf(name) > -1).slice(0, amt);
}

function getTotal(transactions, dataKey = CONSTANT.AMOUNT, startBalance = 0) {
  return transactions.reduceRight((prevValue, nextValue) => prevValue + parseFloat(nextValue[dataKey]), startBalance);
}

function getMonth(dateStr) {
  // console.log('getMonth', dateStr);
  if (typeof dateStr === 'string') {
    return parseFloat(dateStr.slice(0, 2));
  }

  return null;
}

function getYear(dateStr) {
  if (typeof dateStr === 'string') {
    return parseFloat(dateStr.slice(-4));
  }

  return null;
}


function getLastMonthTransactions(strData, dateKey = CONSTANT.DATE, history = 1) {
  const { data: results } = CONVERTER.get(strData);
  const currentMonth = getMonth(results[0][dateKey]);
  const prevMonth = currentMonth - history;
  const filtered = results.filter(row => {
    const month = getMonth(row[dateKey]);
    const year = getYear(row[dateKey]);
    return month === prevMonth && year === 2021;
  });

  return filtered;
}

export default function App(props) {
  const { accounts, extra, data, schema } = props;
  const formattedData = getFormattedData(schema, accounts);


  const {  data: results } = CONVERTER.get(data);
  const filtered = getLastMonthTransactions(data);

  function generateDetails() {
    let transactions = [];
    const filters = extra.filter.forEach(f => {
      transactions = [
        ...transactions,
        ...getLastXTrans(results, f.label, f.count)
      ];
    });

    const incomeTotal = transactions.reduceRight((prevValue, nextValue) => prevValue + parseFloat(nextValue.Amount), 0);
    const expenses = extra.expense.reduce((prev, next) => prev + next.value, 0);


    const savings = 500;
    const utilization = expenses / incomeTotal;
    const balance = incomeTotal - expenses - savings;
    const availablePerWeek = balance / 4;


    return {
      availablePerWeek,
      balance,
      transactions: {
        all: filtered,
        income: transactions
      },
      expenses,
      incomeTotal,
      utilization,
      savings

    };
  }
  const testAccountDetails = generateDetails();

  // let startVal = 0;
  // const data2 = filtered.reverse().map(row => {
  //   const rowBalance = parseFloat(row.Amount);
  //   const nextBalance = startVal + rowBalance;
  //   startVal = nextBalance;
  //   // console.log('nextBalance', rowBalance);
  //   return {
  //     ...row,
  //     monthBalance: nextBalance
  //   }
  // });



  console.log('data', {
    formattedData,
    testAccountDetails,
    accounts,
    filtered,
    results,
    data,
    props
  });

  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={ getMonthBalance(formattedData[1].transactions) }
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Post Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Amount" fill="#82ca9d" />
          <Bar dataKey="monthBalance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

}