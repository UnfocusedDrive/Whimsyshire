
// NEXT: Depth Chain cursor for arr group!!!
// compute input chains...
// go for scenario defaultInput2

// Arithmic Operators
const OPERATOR = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPY: '*',
  DIVIDE: '/'
};


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
const flows = ['+', '5', '+', '32', '+', '(', '5'];

const expectedVal = 67;


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
      // ops => arr
      // @returns str
      getMergedOps: (inp, ops) => {
        let mergedInput = inp;
        ops.forEach(op => mergedInput += op);
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

          let formattedInput = currentValue;
          if (currentValue === '(') {
            currentValue = [];
            chainDepth++;
          }

          // console.log('lastChain', i, lastChain, acc);
          // console.log('groupInput', i, arr[i], acc)


          console.log('getInputChain', chainDepth, currentValue);
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
        this.getMergedValues(arr).forEach(node => {
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

    console.log('calc', {val, chain, mergedInput, methods, expectedVal});

    if (val !== expectedVal) {
      // debugger
    }
  };



// doStuff(defaultInput2, flows);
calc(defaultInput3, flows);

