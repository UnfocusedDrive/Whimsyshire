/**
 * NEXT:
 * - Make '=' btn calculae the input
 * - Style the input to make it pretty....
 * - add shadow ')' like google calc
 */



/**
 * JS Calculator
 *
 * Objectives/Constraints:
 *  - Easy Import and Customize into any App
 *  - Single JS file for entire setup
 *  - No External Libraries
 *
 * Functionality:
 *  - Math calculator with nested level computation
 *
 * References:
 *  UI Design {author} : https://dribbble.com/shots/6144137-Calculator-App-iOS-13/attachments/6144137-Calculator-App-iOS-13?mode=media
 *  CodePen: https://codepen.io/anthonykoch/pen/xVQOwb?editors=0010
 *   adsd : https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
 *
 *  Comments/questions/requests? Feel free to reach out to me!
 */



// !! Keep entire file as single for Codepen

// TODO
// key listener
// colors on operators
// add instructions on top of calc demo
// mybe some cool animatiosn
// more border radius on buttons

// Color Palette
const COLOR_PALETTE = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  GRAY_1: '#141414',
  GRAY_2: '#242424',
  GRAY_3: '#484848',
  GRAY_4: '#eef0f9',
  ORANGE: '#f59315',
  RED_1: '#3b0202',
  RED_2: '#f51515',
  GREEN: '#5bce09'
};

// Arithmic Operators
const OPERATOR = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPY: '*',
  DIVIDE: '/'
};

// Actions
const ACTION = {
  EQUALS: '='
};

// Common Util
const _ = {
  camel2Kebab: str => str.split('').map(s => s === s.toUpperCase() ? `-${s.toLowerCase()}` : s).join(''),
  chunkArr: (arr, chunkSize) => {

    const chunks = [];
    for (let i = 0; i < arr.length; i+=chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  },
  getLabel: arr => {
    let label = '';

    for (item of arr) {
      if (item || item > -1) {
        label = _.toStr(item);
        break;
      }
    }

    return label;
  },
  isNode: val => {
    return typeof val === 'object' ? Boolean(val.nodeType === 1) : false;
  },
  num2Str: val => `${parseInt(val, 10)}`,
  toPx: num => `${num}px`,
  toStr: val => `${val}`,
  trimLeadingZeroes: string => {
    return string.split('.').map(s => {
      if (s.length > 1) {
        const fm = s.replace(/^0+/, '');
        return fm === '' ? '0' : fm;
      }
      return s;
    }).join('.');
  }
};


// Calculator Util
const calcUtil = {
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
  getLastChain: function(chain, level) {
    const lastItem = chain[chain.length-1];

    // if (level > 0) {
    //   debugger
    // }


    // console.log('getLastChain', chain, level);

    if (level > 0 && Array.isArray(lastItem)) {
      return this.getLastChain(lastItem, level - 1);
    }

    return chain;
  },
  // input => str
  // @return => arr
  getInputChain: function(input) {
    // How deep in the chain we are
    let chainLevel = 0;
    const result = input.split('').reduce((acc, currentValue, i, arr) => {
      const lastChain = this.getLastChain(acc, chainLevel);
      // const formattedInput = currentValue === '(' ? [] : currentValue;






      // Create New Array from group key
      let formattedInput = currentValue;
      if (currentValue === '(') {
        chainLevel++;
        formattedInput = [];
      } else if (currentValue === ')') {
        // chainLevel--;
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

/**
 * Spawn DOM
 * Generates HTML elements
 * @param {element} parentEl - parent element to spawn in
 * @returns {element}
 */
const Spawn = (props = {}) => {
  const {
    children = [],
    className,
    events,
    parentEl,
    name,
    label,
    style,
    type = 'div',
    value
  } = props;
  const el = document.createElement(type);

  const addChildren = (children) => {
    let fmChildren = children;
    if (!Array.isArray(fmChildren)) {
      fmChildren = [fmChildren];
    }
    fmChildren.forEach(child => {
      let fmChild = child;
      if (!_.isNode(child) && (typeof child === 'string' || typeof child === 'number')) {
        fmChild = document.createTextNode(child);
      }

//       console.log('child', child, _.isNode(child));
//       if (child === 0) {
//         debugger
//       }

      el.appendChild(fmChild);
    });
  }

  if (events) {
    Object.keys(events).forEach(key => {
       el.addEventListener(key, events[key]);
    });
  }

  // Attach Style
  if (style) {
    el.setAttribute('style', Object.keys(style).map(key => `${_.camel2Kebab(key)}: ${style[key]};`).join(' '));
  }

  // Attach Class Name
  if (className) {
    el.setAttribute('class', className);
  }

  const lblNode = _.getLabel([label, name, value]);
  if (lblNode) {
    const lbl = document.createTextNode(lblNode);
    el.appendChild(lbl);
  }

  addChildren(children);

  // Append to parent
  if (parentEl) {
    parentEl.appendChild(el);
  }

  return el;
};


// Calculator
class Calculator {
  constructor(props = {}) {
    const { input = '0', parentEl, style, theme } = props;

    this.input = input;
    this.theme = {
      color: COLOR_PALETTE.BLACK,
      displayColor: COLOR_PALETTE.WHITE,
      ...this.theme
    };

    this.inputEl = Spawn({
      children: input
    });
    this.prevInputEl = Spawn({
      children: ''
    });
    this.el = Spawn({
      className: 'js-calculator',
      children: [
        Spawn({
          children: this.prevInputEl,
          style: {
            color: this.theme.displayColor,
            // fixed height so does not shify
            height: '20px',
            textAlign: 'right'
          }
        }),
        Spawn({
          children: this.inputEl,
          style: {
            color: this.theme.displayColor,
            textAlign: 'right',
            height: '100px'
          }
        })
      ],
      parentEl,
      style: {
        background: COLOR_PALETTE.GRAY_2,
        borderRadius: '4px',
        display: 'inline-block',
        padding: '10px',
        ...style
      }
    });

    this.renderBtns();
    // this.calculateInput();
  }

  // @returns {string}
  getCalculatedInput() {
    const mergedInput = calcUtil.getMergedOps(this.input, []);
    const chain = calcUtil.getInputChain(mergedInput);
    const total = calcUtil.getComputeChain(chain);

    // console.log('resukt', total);
    return {
      mergedInput,
      chain,
      total: `${total}`
    };

  }

  /**
   * Get button
   * @returns {array} of buttons for calculator
   */
  getButtons() {
    return [
      {
        // Euler
        value: 'e'
      },
      {
        label: 'π',
        value: 'p'
      },
      {
        name: 'sin'
      },
      {
        name: 'deg'
      },
      {
        label: 'C',
        value: 'clear'
      },
      {
        value: '('
      },
      {
        value: ')'
      },
      {
        label: '÷',
        value: '/'
      },
      {
        value: 7
      },
      {
        value: 8
      },
      {
        value: 9
      },
      {
        label: 'X',
        value: '*'
      },
      {
        value: 4
      },
      {
        value: 5
      },
      {
        value: 6
      },
      {
        value: '-'
      },
      {
        value: 1
      },
      {
        value: 2
      },
      {
        value: 3
      },
      {
        value: '+'
      },
      {
        value: 0
      },
      {
        value: '.'
      },
      {
        value: ACTION.EQUALS
      }
    ];
  }

  handleBtnOnClick(value) {
    // console.log('handleBtnOnClick', value);

    switch(value) {

      case 'clear':
      this.resetInput();
        break;
      // Calculate Input
      case '=':
        // const total = this.getCalculatedInput();
        this.calculateInput();
        break;
      default:
        // debugger
        // this.updateInput(this.input + value);
        this.appendInput(value);

    }
  }

  /**
   * Reset Input
   */
  resetInput() {
    this.updateInput('0');
  }

  calculateInput() {
    const { mergedInput, total } = this.getCalculatedInput();

    // Save reference of last used arithmatic
    const prevInput = mergedInput === total ? '' : mergedInput;
    this.prevInputEl.innerHTML = prevInput;

    // this.input = total;
    // Update Display

    // this.inputEl.innerHTML = total;
    // debugger

    this.updateInput(total);

  }

  /**
   * Formats value with current input
   * @param {string|number} value
   * @returns {string} of formatted input
   */
  getFormattedInput(value) {
    console.log('getFormattedInput', this.input, value);

    let formattedValue = `${value}`;

    const lastInput = this.input.slice(-1);
    const lastInputIsOp = calcUtil.isOperator(lastInput);

    // If fresh instance, replace the default '0' and setting a new num...
    const lastIsDefault = !calcUtil.isOperator(value) && this.input === '0';
    // update if previous input and new value are both not operator
    const lastIsSameOp = calcUtil.isOperator(formattedValue) && (formattedValue === lastInput);

    const lastIsOp = calcUtil.isOperator(formattedValue) && lastInputIsOp;

    if (lastIsDefault) {
      return formattedValue;
    } else if (lastIsSameOp) {
      return this.input;
    } else if (lastIsOp) {
      return this.input.slice(0, this.input.length-1) + formattedValue;
    }

    return this.input + formattedValue;
  }

  // value => str|num
  appendInput(value) {
    this.updateInput(this.getFormattedInput(value));
  }

  /**
   * Update Input and Display Value
   * @param {string} value - to set input as
   */
  updateInput(value) {
    this.input = value;

    // Update Display
    this.inputEl.innerHTML = value;
  }

  /**
   * Render Buttons on Calculator
   */
  renderBtns() {
    _.chunkArr(this.getButtons(), 4).forEach((group, j) => {
      this.el.appendChild(Spawn({
        children: group.map((btn, i) => {
          const { value } = btn;

          const spacer = 10;
          let width = 40;
          if (value === 0) {
            width = (40 * 2) + (spacer * 2);
          }

          let height = 40;
          if (j === 0) {
            height = 30;
          }

          let color = this.theme.color;

          let background = this.theme.button;
          if (calcUtil.isOperator(value)) {
            background = '#f59315';
            color = this.theme.buttonAction;
          } else if (value === 'clear') {
            background = '#3b0202';
            color = '#f51515';
          } else if (value === ACTION.EQUALS) {
            background = '#5bce09';
            color = this.theme.buttonAction;
          }

          return Spawn({
            style: {
              display: 'inline-block',
              padding: _.toPx(spacer)
            },
            children: [
              Spawn({
                ...btn,
                events: {
                  click: () => this.handleBtnOnClick(value)
                },
                style: {
                  background,
                  borderRadius: '6px',
                  borderStyle: 'none',
                  color,
                  width: _.toPx(width),
                  height: _.toPx(height)
                },
                type: 'button'
              })
            ]
          });
        })
      }));
    });
  }
}

// App
class App {
  constructor(props) {
    const { calculatorProps = {} } = props;

    // App Element
    const el = Spawn({
      className: 'app',
      parentEl: document.body,
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    });

    // Getting Started
    Spawn({
      parentEl: el,
      children: [
        Spawn({
          children: 'JS Calculator',
          style:{
            color: COLOR_PALETTE.WHITE
          }
        }),
        Spawn({
          children: 'Use keyboard or click buttons to calculate!',
          style:{
            color: COLOR_PALETTE.WHITE,
            marginTop: '10px'
          }
        })
      ]
    })

    const calculator = new Calculator({
      // Append calculator to App
      parentEl: el,
      style: {
        marginTop: '30px'
      },
      ...calculatorProps
    });

    // Custom App Styles
    document.body.style.background = COLOR_PALETTE.GRAY_1;

    return this;
  }
}

const run = new App({
  calculatorProps: {
    // Start Input Value for Calculator
    input: '0+(12+(2+(3+(1+7'
  }
});