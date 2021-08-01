/**
 * JS Calculator
 *
 * Objectives/Constraints:
 *  - Easy Import and Customize into any App
 *  - Single JS file for entire setup
 *  - No External Libraries
 *  - Theme Token Support
 *
 * Functionality:
 *  - Math calculator with nested level computation
 *
 * I/O:
 *  - Click buttons calculate
 *  - Press keyboard keys to calculate
 *    - Enter/Equals to computer / Backspace to remove last character
 *
 * References:
 *  UI Design {author} : https://dribbble.com/shots/6144137-Calculator-App-iOS-13
 *  CodePen: https://codepen.io/anthonykoch/pen/xVQOwb?editors=0010
 *   adsd : https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
 *
 *  Comments/questions/requests? Feel free to reach out to me!
 *
 *


 * NEXT:
 * Update / Icon for divider
 * Add formatted to input and prev input -- addds commas, styles colors, adds spaces
 * = with no compute will just send to other value -- add animation like google calc example
 * C - To Clear all INPUT
 * Finish KEYBOARD redirect .. ENTER => EQUALS, EQUALS => EQUALS
 * CHange div symbol to /
 * Fix border radius on buttons and calculator
 * Get proper type face
 * Consider idea of making each button its own Class component -- potetnially reduce code/bloat/organization
 * [done] Get color states for op, equals, computer, clr (by 7% probably)
 * Finish Hover/Press colors on each key. ++ Update style based on the global events
 * [done] Make operator text color white
 * make current input color big
 * make input with colored operators (may already be done...);
 * - Style the input to make it pretty....
 * - add shadow ')' like google calc
 * Add operatiosn for e, pie sin, and deg












 */



// !! Keep entire file as single for Codepen

// TODO
// key listener
// colors on operators
// add instructions on top of calc demo
// mybe some cool animatiosn
// more border radius on buttons


const DEFAULT_VALUE = '0';

// Color Palette
const COLOR_PALETTE = {
  WHITE_00: '#ffffff',
  GRAY_00: '#141414',
  GRAY_10: '#17181A',
  GRAY_20: '#222427',
  GRAY_30: '#2f3237', // + 6% Lightness
  GRAY_40: '#3e4147', // + 6% Lightness
  GRAY_80: '#88898A',
  BLACK_00: '#000000',
  GREEN_10: '#2EC973',
  GREEN_20: '#40d482', // + 6% Lightness
  GREEN_30: '#59d993', // + 6% Lightness
  YELLOW_10: '#FF9500',
  YELLOW_20: '#ffa21f', // + 6% Lightness
  YELLOW_30: '#ffae3d', // + 6% Lightness
  YELLOW_80: '#8B570D',
  RED_10: '#F6444E',
  RED_60: '#562f39', // - 6% Lightness
  RED_70: '#42242c', // - 6% Lightness
  RED_80: '#2D191E'
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
  CLEAR: 'clear',
  UNDO: 'undo',
  COMPUTE: '=',
  // remove this one....
  EQUALS: '='
};

// Calculator Inputs
const INPUTS = [
  // Euler
  {
    value: 'e'
  },
  // Pie
  {
    label: 'π',
    value: 'p'
  },
  {
    name: 'sin',
    value: null
  },
  {
    name: 'deg',
    value: null
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
    // label: '÷',
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

const REDIRECTED_INPUTS = {
  // Backspace:
  Enter: ACTION.EQUALS
};

const GLOBAL_INPUTS = [
  // Remove last character
  {
    value: 'Backspace'
  },
  // Compute current input
  {
    value: 'Enter'
  }
];

// Common Util
const _ = {
  camel2Kebab: str => str.split('').map(s => s === s.toUpperCase() ? `-${s.toLowerCase()}` : s).join(''),
  /**
   * Split input into array of even sized chunks
   * @param {string|array} input - input to chunk
   * @param {number} chunkSize - chunk input by every n size
   * @returns {array} of chunks from source input
   */
  splitToChunks: (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i+=chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  },
  /**
   * Split input into array of even sized chunks starting from the last value
   * @param {string|array} input - input to chunk
   * @param {number} chunkSize - chunk input by every n size
   * @returns {array} of chunks from source input
   */
  splitToChunksRight: (arr, chunkSize) => {
    const chunks = [];
    for (let i = arr.length; i > 0; i-=chunkSize) {
      // chunks.push(arr.slice(i, i + chunkSize));
      chunks.unshift(arr.slice(Math.max(0, i - chunkSize), i));
      // console.log('splitToChunksRight', i - chunkSize, i, arr[i]);
    }


    // console.log('splitToChunksRight', chunks, arr, arr.length, chunkSize);

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
  /**
   * Check if value is number
   * @param {*} value - value to check
   * @returns {boolean} true if number
   */
  isNumber: value => typeof value === 'number',
  num2Str: val => `${parseInt(val, 10)}`,
  toPx: num => `${num}px`,
  toStr: val => `${val}`,
  trimLeadingZeroes: string => {
    return string.split('.').map(s => {
      if (s.length > 1) {
        const fm = s.replace(/^0+/, '');
        return fm === '' ? DEFAULT_VALUE : fm;
      }
      return s;
    }).join('.');
  }
};


/**
 * Calculator Util
 * All the calculator operations are computed from here.
 */
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
  // /**
  //  * Get Compute Chain
  //  * @param {*} arr - Array to compute chain
  //  * @param {*} cb - callback for each chain
  //  * @returns {*} value from cb()
  //  */
  // getComputeChain(arr, cb) {
  //   const lastItem = arr[arr.length -1];
  //   const more = Array.isArray(lastItem);
  //   if (more) {

  //     return cb(arr.slice(0,-1)) + this.getComputeChain(lastItem, cb);


  //     // return [
  //     //   cb(arr.slice(0,-1)),
  //     //   this.getComputeChain(lastItem, cb),
  //     // ];
  //   }

  //   return cb(arr);
  // },
  /**
   * Get Compute Chain
   * @param {*} arr - Array to compute chain
   * @param {*} cb - callback for each chain
   * @returns {*} value from cb()
   */
   getComputeChainFor(arr, cb) {
    const lastItem = arr[arr.length -1];
    const more = Array.isArray(lastItem);
    if (more) {

      return cb(
        arr.slice(0,-1),
        this.getComputeChainFor(lastItem, cb)
      );


      // return [
      //   cb(arr.slice(0,-1)),
      //   this.getComputeChain(lastItem, cb),
      // ];
    }

    return cb(arr);
  },
  getFormattedDisplayValue(str) {
    const chunks = _.splitToChunksRight(str, 3);
    const f = chunks.join(',');


    console.log('getFormattedDisplayValue', f, chunks);
    return f;


    // console.log('chunks', chunks);
    // return str.split('').
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
      // let formattedInput = Spawn({
      //   children: currentValue
      // });
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

    let total = 0;
    let operator = OPERATOR.ADD;
//
    const mergedValues = this.getMergedValues(arr);
    console.log('mergedValues', mergedValues);

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

    console.log('getTotal', total, arr);


    return total;
  },
  /**
   *
   * @param {*} value
   * @returns
   */
  isOperator(value) {
    switch (value) {
      case OPERATOR.ADD:
      case OPERATOR.SUBTRACT:
      case OPERATOR.MULTIPY:
      case OPERATOR.DIVIDE:
        return true;
      default:
        return false;
    }
  }
};

/**
 * Spawn DOM (The Document Object Model)
 * The Spawn Engine is a stateless virtual DOM generator.
 * @param {object|string} props - props of the Spawn
 * @param {element} props.parentEl - parent element to spawn into
 * @returns {element} reference of your Spawn
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
    tag = 'div',
    // type = 'div',
    value,
    // Convert rest props to attrs
    ...restProps
  } = props;


  if (typeof props === 'string') return document.createTextNode(props);

  // console.log('props', props);

  const el = document.createElement(tag);

  const appendChildren = (children) => {
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

  // Attach Event Listeners
  // Assign {event} and {el} (self)
  if (events) {
    Object.keys(events).forEach(key => {
       el.addEventListener(key, e => events[key](e, el));
    });
  }

  // if (events) {
  //   Object.keys(events).forEach(key => {
  //      el.addEventListener(key, events[key]);
  //   });
  // }

  // Attach Style
  if (style) {
    el.setAttribute('style', Object.keys(style).map(key => {

      const trasodky = _.isNumber(style[key]);
      // console.log('trasodky', trasodky, style[key]);
      // number default to px
      let value = style[key];
      if (_.isNumber(value)) {
        value = _.toPx(value);
      }
      // if

      return `${_.camel2Kebab(key)}: ${value};`
    }).join(' '));
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

  // .. spread down the rest to html attrs
  Object.keys(restProps).forEach(key => el.setAttribute(key, restProps[key]));

  appendChildren(children);

  // Append to parent
  if (parentEl) {
    parentEl.appendChild(el);
  }

  return el;
};


/**
 * Calculator App Component
 * Accepts onKey or Click Events
 * @returns {number} of current value
 */
class Calculator {
  constructor(props = {}) {
    const {
      className = '',
      input = DEFAULT_VALUE,
      parentEl,
      style,
      theme
  } = props;

    this.buttons = {};
    this.input = input;
    // this.input = 25;
    this.theme = this.getTheme(theme);


    // Text Input Style
    const txtStyle = {
      textAlign: 'right',
      overflow: 'hidden'
    };

    const tVal = 12545;
    // this.getCalculatedInput();


    // Display Input Element
    this.inputEl = Spawn({
      // children: input,
      // add formatter...
      // children: calcUtil.getFormattedDisplayValue(_.toStr(tVal), 3),
      style: {
        whiteSpace: 'nowrap',
        float: 'right',
        fontSize: 20
      }
    });
    // Display Last Calculated Input Element
    this.prevInputEl = Spawn({
      // children: input,
      style: {
        fontSize: 14
      }
    });
    this.el = Spawn({
      parentEl,
      className: [className, 'js-calculator'].join(' '),
      children: Spawn({
        children: [
          Spawn({
            children: this.prevInputEl,
            style: {
              color: this.theme.displayColor,
              // fixed height so does not shify
              height: 20,
              ...txtStyle
            }
          }),
          Spawn({
            children: this.inputEl,
            style: {
              color: this.theme.displayColor,
              height: 100,
              ...txtStyle
            }
          })
        ],
        style: {
          padding: 10
        }
      }),
      style: {
        background: this.theme.background,
        borderRadius: 20,
        display: 'inline-block',
        padding: 10,
        width: 260,
        boxSizing: 'border-box',
        ...style
      }
    });

    this.renderBtns();
    // this.calculateInput();
    // keydown instead of keypress to handle backspace
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    this.calculateInput();

    console.log('constructor', this);
  }


  getTheme(theme) {
    return {
      background: COLOR_PALETTE.GRAY_10,
      // Default Button
      button: COLOR_PALETTE.GRAY_20,
      buttonHover: COLOR_PALETTE.GRAY_30,
      buttonPress: COLOR_PALETTE.GRAY_40,
      buttonAction: COLOR_PALETTE.WHITE_00,
      // Operator Button
      buttonOp: COLOR_PALETTE.YELLOW_10,
      buttonOpHover: COLOR_PALETTE.YELLOW_20,
      buttonOpPress: COLOR_PALETTE.YELLOW_30,
      // Clear Button
      buttonClr: COLOR_PALETTE.RED_80,
      buttonClrHover: COLOR_PALETTE.RED_70,
      buttonClrPress: COLOR_PALETTE.RED_60,
      buttonClrFont: COLOR_PALETTE.RED_10,
      // Compute Button
      buttonComp: COLOR_PALETTE.GREEN_10,
      buttonCompHover: COLOR_PALETTE.GREEN_20,
      buttonCompPress: COLOR_PALETTE.GREEN_30,
      color: COLOR_PALETTE.WHITE_00,
      displayColor: COLOR_PALETTE.WHITE_00,
      ...theme
    };
  }

  /**
   * Destroy Calculator Instance
   */
  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.el = null;
  }

  // @returns {string}
  getCalculatedInput(str = this.input) {
    const mergedInput = calcUtil.getMergedOps(str, []);
    const chain = calcUtil.getInputChain(mergedInput);
    // const total = calcUtil.getComputeChain(chain, arr => calcUtil.getTotal(arr));
    const test = calcUtil.getComputeChainFor(chain,  (arr, lastCompute = []) => {
      return [...calcUtil.getMergedValues(arr), ...lastCompute];
    }).reduce((acc, item, i) => [...acc, item, ' '], []).slice(0, -1);

    // new total is here
    const test2 = calcUtil.getComputeChainFor(chain,  (arr, lastCompute = 0) => {

      const t = calcUtil.getMergedValues(arr);
      const j = t.map(res => {

        if (calcUtil.isOperator(res)) {
          return Spawn({
            children: res
          });
        } else {
          return Spawn({
            children: res
          });
        }
      });
``
      // console.log('t', arr, j, t);
      // return [t, ...lastCompute];
      return calcUtil.getTotal(t) + lastCompute;
    });

    const res = {
      // mergedInput,
      input: mergedInput,
      // this_input: this.input,
      // chain,
      // total: `${total}`,
      prevInputEl: test,
      // test,
      // test2,
      total: _.toStr(test2)
    };


    console.log('getCalculatedInput', res);

    return res;

  }

  /**
   * Get button
   * @returns {array} of buttons for calculator
   */
  getButtons() {
    return INPUTS;
  }

  getValidInputs(value) {

    const formattedValue =
    console.log('getValidInputs', value);
    const result = [...INPUTS, ...GLOBAL_INPUTS].map(o => `${o.value}`).indexOf(`${value}`) > -1;
    debugger

    return result;
  }

  handleKeyDown = (e) => {
    const value = e.key;
    console.log('handleKeyDown', e);

    this.triggerInputEvent(value);
  }

  handleKeyUp = (e) => {
    const value = e.key;
    console.log('handleKeyUp', e);

    // this.triggerInputEvent(value);
    const validatedInput = this.getValidInputs(value);

    if (validatedInput) {
      const btn = this.buttons[value];
      btn.el.style.background = btn.theme.background;
    }


  }

  handleBtnOnClick(value) {
    this.triggerInputEvent(value);
  }

  /**
   * Trigger input event
   * @parma {string} value - value to send
   */
  triggerInputEvent(value) {
    const validatedInput = this.getValidInputs(value);

    if (validatedInput) {
      const btn = this.buttons[value];
      btn.el.style.background = btn.theme.hover;













      switch(value) {
        case 'Backspace':
          this.removeLastInputValue();
          break;
        case 'clear':
        this.resetInput();
          break;
        // Calculate Input
        case '=':
        case 'Enter':
          this.calculateInput();
          break;
        default:
          this.appendInputValue(value);
      }
    }
  }

  /**
   * Reset Input
   */
  resetInput() {
    this.updateInput(DEFAULT_VALUE);
  }

  calculateInput() {
    const { prevInputEl, input, total } = this.getCalculatedInput();

    // Save reference of last used arithmatic
    this.prevInputEl.innerHTML = '';
    if (input !== total) {
      prevInputEl.forEach(item => {
          let el;
          let children = item;



          if (calcUtil.isOperator(children)) {
            // special format
            const filter = INPUTS.filter(z => z.value === children);
            if (filter.length && filter[0].label) {
              console.log('filter', filter, children);
              children = filter[0].label.toLowerCase();
            }

            el = Spawn({
              tag: 'span',
              children,
              style: {
                color: 'red'
              }
            })
            //   children: children
            // });
          } else {
            el = Spawn(children);
            // return Spawn({
              // children: children
            // });
          }

          // return el;

          this.prevInputEl.appendChild(el);
      })
    }
    // const prevInput = input === total ? '' : input;
    // this.prevInputEl.innerHTML = prevInput;



    // this.prevInputEl.replaceChildren(prevInputEl);
    // this.prevInputEl.innerHTML

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

    // If fresh instance, replace the default DEFAULT_VALUE and setting a new num...
    const lastIsDefault = !calcUtil.isOperator(value) && this.input === DEFAULT_VALUE;
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
  appendInputValue(value) {
    this.updateInput(this.getFormattedInput(value));
  }

  removeLastInputValue() {
    let newVal = this.input.slice(0, -1);
    newVal = newVal || DEFAULT_VALUE;

    this.updateInput(newVal);
  }

  /**
   * Update Input and Display Value
   * @param {string} value - to set input as
   */
  updateInput(value) {
    this.input = value;

    // Update Display
    this.inputEl.innerHTML = calcUtil.getFormattedDisplayValue(_.toStr(value), 3);
  }

  /**
   * Render Buttons on Calculator
   */
  renderBtns() {
    _.splitToChunks(this.getButtons(), 4).forEach((group, j) => {
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

          let color;
          let background;
          let hover;
          let pressed;
          let type;
          // Operator Input
          if (calcUtil.isOperator(value)) {
            type = 'operator';
            background = this.theme.buttonOp;
            hover = this.theme.buttonOpHover;
            pressed = this.theme.buttonOpPress;
            color = this.theme.buttonAction;
          } else if (value === 'clear') {
            type = 'clear';
            // background = '#3b0202';
            background = this.theme.buttonClr;
            hover = this.theme.buttonClrHover;
            pressed = this.theme.buttonClrPress;
            color = '#f51515';
          } else if (value === ACTION.EQUALS) {
            type = 'compute';
            // background = '#5bce09';
            background = this.theme.buttonComp;
            hover = this.theme.buttonCompHover;
            pressed = this.theme.buttonCompPress;
            color = this.theme.buttonAction;
          // Assign Style Events
          } else {
            type = 'default';
            color = this.theme.color;
            background = this.theme.button;
            hover = this.theme.buttonHover;
            pressed = this.theme.buttonPress;
          }

          // Attach event handlers
          const events = {
            click: () => this.handleBtnOnClick(value),
            mouseenter: (e, el) => el.style.background = hover,
            mousedown: (e, el) => el.style.background = pressed,
            keydown: (e, el) => el.style.background = pressed,
            keyup: (e, el) => el.style.background = background,
            mouseup: (e, el) => el.style.background = hover,
            mouseleave: (e, el) => el.style.background = background
          };


          // console.log('background', background, this);



          const el = Spawn({
            ...btn,
            events,
            style: {
              background,
              // borderRadius: 6,
              borderRadius: 10,
              borderStyle: 'none',
              color,
              width,
              height,
              cursor: 'pointer',
              fontFamily: `'Roboto', sans-serif`
            },
            tag: 'button'
          });

          // Button Container
          const elContainer = Spawn({
            style: {
              display: 'inline-block',
              padding: spacer
            },
            children: [
              // Button
              el
            ]
          });


          // console.log('renderBtns', el, elContainer, btn);
          // this.buttonEls[btn.value] = el;
          this.buttons[btn.value] = {
            el,
            type,
            theme: {
              color,
              background,
              hover,
              pressed
            },
            ...btn
          };


          return elContainer;
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

    const calcContainer = Spawn();




    // JS logo color

    // Getting Started
    Spawn({
      parentEl: el,
      children: [
        Spawn({
          children: [
            Spawn({
              children: 'JS',
              style: {
                display: 'inline-flex',
                background: '#ff005e',
                // #ff1f71
                //#ff3d84
                width: 26,
                height: 26,
                fontSize: 14,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                marginRight: 6,
              }
            }),
            // Spacer...
            // Spawn({
            //   style: {
            //     width: 6,
            //     height: 10,
            //     display: 'inline-block'
            //   }
            // }),
            // 'JS',
            'Calculator'
          ],
          style:{
            color: COLOR_PALETTE.WHITE_00,
            fontSize: 16,
            display: 'flex',
            alignItems: 'center'
          }
        }),
        Spawn({
          children: 'Use keyboard or click buttons to calculate!',
          style:{
            color: '#dddddd',
            // fontSize: '14px',
            fontSize: 12,
            marginTop: 8
          }
        }),
        calcContainer,
        Spawn({
          children: [
            'Inspired by Nicat Manafov',
            ' @ ',
            Spawn({
              tag: 'a',
              href: 'https://dribbble.com/shots/6144137-Calculator-App-iOS-13',
              children: 'dribbble.com',
              style: {
                color: '#ff005e',
                textDecoration: 'none'
              },
              events: {
                mouseenter: (e, el) => el.style.color = '#ff3d84',
                mousedown: (e, el) => el.style.color = '#ff70a5',
                mouseup: (e, el) => el.style.color = '#ff3d84',
                mouseleave: (e, el) => el.style.color = '#ff005e'
              }
            })
          ],
          style:{
            color: '#ffffff',
            fontSize: 12,
            fontFamily: `'Dancing Script', cursive`,
            marginTop: 8,
            textAlign: 'center'
          }
        })
      ]
    })

    const calculator = new Calculator({
      // Append calculator to App
      parentEl: calcContainer,
      style: {
        marginTop: 20
      },
      className: 'my special',
      ...calculatorProps
    });


    // Import External Fonts
    [
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap',
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=MonteCarlo&family=Style+Script&display=swap'
    ].forEach(href => {
      Spawn({
        parentEl: document.head,
        tag: 'link',
        rel: 'stylesheet',
        type: 'text/css',
        href
      });
    });

    // Custom App Styles
    // from : https://www.eggradients.com/category/purple-gradient
    document.body.style.backgroundColor = '#a4508b';
    document.body.style.backgroundImage = 'linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)';
    document.body.style.fontFamily = `'Roboto', sans-serif`;

    return this;
  }
}

const run = new App({
  calculatorProps: {
    // Start Input Value for Calculator
    // testing
    // input: '0+(12+(2+(3+(1+7',
    // USE this for final demo
    input: '45+(1250*100)/10'
  }
});