
// NEXT: Depth Chain cursor for arr group!!!
// compute input chains... Arr must match correct nested level
// go for scenario defaultInput2

// Arithmic Operators
const OPERATOR = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPY: '*',
  DIVIDE: '/'
};

const additionalOperators = ['+', '5', '+', '32', '+', '(', '5'];
// Pre tests
const ts = [
  {
    input: '0+(12+(2+(3+(1+7',
    output: 25
  },
  {
    input: '0+(1+(2+(3+(1+9))))',
    output: 16
  }
];

// Merge pre tests with additional operators
const tests = [
  ...ts,
  ...ts.map(t => {
    return {
      ...t,
      extra: additionalOperators,
      output: t.output + 42
    }
  })
]


const defaultInput2 = '0+(12+(2+(3+(1+7'; // cursor at last chain
const defaultInput3 = '0+(1+(2+(3+(1+9))))'; // cursor at level 0 depth
// expected = 58

// // this is probably bad....
// const defaultInput = [
//   0,
//   '+',
//   [
//     1,
//     '+',
//     [
//       2,
//       '+',
//       [
//         3,
//         '+',
//         [
//           1,
//           '+',
//           2
//         ]
//       ]
//     ]
//   ]
// ];

// const expectedVal = 67;


  // input => str
  // operations => arr('str')
  const calc = (input, operations) => {
    // let mergedInput = input;

    const methods = {
      computeValue(total, operator, value) {
        switch (operator) {
          case '-':
            return total - value;
          case '*':
            return total * value;
          case '/':
            return total / value;
          case '+':
          default:
            return total + value;
        }
      },
      // return number
      getComputeChain(arr, cb) {
        const lastItem = arr[arr.length -1];
        const more = Array.isArray(lastItem);
        if (more) {

          return this.getTotal(arr.slice(0,-1)) + this.getComputeChain(lastItem, cb);


          // return [
          //   this.getTotal(arr.slice(0,-1)),
          //   this.getComputeChain(lastItem, cb),
          // ];
        }

        return this.getTotal(arr);
      },
      // input => str
      // [ops] => arr
      // @returns str
      getMergedOps: (inp, ops = []) => {
        let mergedInput = inp;
        // Merged in unfiltered input
        if (ops.length) {
          ops.forEach(op => mergedInput += op);
        }
        return mergedInput;
      },
      // values => arr
      // returns => arr|null
      getMergedValues(values) {
        if (values) {
          let merged = [''];
          // console.log('getMergedValues', values);
          for (let i = 0; i < values.length; i++) {
            // Push if current or previous was operator
            if (this.isOperator(merged[merged.length-1]) || this.isOperator(values[i])) {
              merged.push(values[i]);
            // Add character to last item
            } else {
              merged[merged.length-1] += values[i];
            }
          }

          return merged;
        }

        return null;



      },
      // input arr
      // return arr
      getLastChain: function(chain) {
        const lastItem = chain[chain.length-1];

        if (Array.isArray(lastItem)) {
          return this.getLastChain(lastItem);
        }

        return chain;
      },
      // input => str
      // @return => arr
      getInputChain: function(input) {
        // How deep in the chain we are
        let chainDepth = 0;
        const result = input.split('').reduce((acc, currentValue, i, arr) => {
          const lastChain = this.getLastChain(acc);
          // const formattedInput = currentValue === '(' ? [] : currentValue;

          // Create New Array from group key
          let formattedInput = currentValue;
          if (currentValue === '(') {
            formattedInput = [];
            chainDepth++;
          }

          // console.log('lastChain', i, lastChain, acc);
          // console.log('groupInput', i, arr[i], acc)


          // console.log('getInputChain', chainDepth, formattedInput, currentValue);
          // if (currentValue === '9') {
            // debugger
          // }


          // Append next item
          if (lastChain === acc) {
            return [
              ...acc,
              formattedInput
            ];
          }

          // Add last item nested arr
          lastChain.push(formattedInput);
          return acc;
        }, []);
        // console.log('result', result);
        return result;
      },
      getTotal(arr) {
        // const f = this.computeInputChain(arr);
        // const a = this.getMergedValues(arr);
        // console.log('getTotal', a, arr);

        let total = 0;
        let operator = OPERATOR.ADD;

        const mergedValues = this.getMergedValues(arr);
        // console.log('mergedValues', mergedValues);

        mergedValues.forEach(node => {
           const value = Number.parseFloat(node, 10);
          // Value is Number
          if (!Number.isNaN(value)) {
            total = this.computeValue(total, operator, value);
          // Value is Operator
          } else if (this.isOperator(node)) {
            operator = node;
          }
        });

        return total;
        // return _.toStr(total);
      },
      isOperator(value) {
        switch (value) {
          case '+':
          case '-':
          case '*':
          case '/':
            return true;
          default:
            return false;
        }
      }
    };

    const mergedInput = methods.getMergedOps(input, operations);
    const chain = methods.getInputChain(mergedInput);
    const val = methods.getComputeChain(chain);

    // console.log('calc', {val, chain, mergedInput, methods})
    // if (val !== expectedVal) {
      // debugger
    // }

    return val;
  };



// doStuff(defaultInput2, flows);
// calc(defaultInput3, flows);


const testResultsPassed = tests.every(test => {
  const result = calc(test.input, test.extra);

  if (result !== test.output) {
    debugger
  }

  return result === test.output;
});

console.log('testResultsPassed', testResultsPassed);