const _ = {
  addEvents: (el, obj) => {
    Object.keys(obj).forEach(key => {
      el.addEventListener(key, () => { obj[key](el) });
    });
  },
  camel2Kebab: (str) => {
    return str.split('').map(s => {
      return s === s.toUpperCase() ? `-${s.toLowerCase()}` : s;
    }).join('');
  },
  getStyle: (style) => {
    const arr = [];
    Object.keys(style).forEach(key => {

      let formatName = key;
      if (!(key.split('--').length > 1)) {
        formatName = _.camel2Kebab(key);
      }

      arr.push(`${formatName}: ${style[key]};`);
    });
    return arr.join(' ');
  },
  num2Px: num => `${num}px`,
  render: {
    btn: ({modalProps, label, color}) => {
      const structure = {
        style: {
          background: color,
          color: '#ffffff'
        },
        type: 'button',
        children: [label],
        events: {
          click: () => {
            const modalContainer = Spawn({
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            });

            const props = {
              ...modalProps,
              onClose: () => {
                document.body.removeChild(modalContainer);
              }
            };

            const modal = _.render.modal(props);
            modalContainer.appendChild(modal);
            document.body.append(modalContainer);
          }
        }
      }

      const btnEl = Spawn(structure);
      return btnEl;
    },
    btnClose: () => {
      const size = 16;
      const color = '#ffffff';
      const colorKey = '--close-color';

      return Spawn({
        style: {
          position: 'relative',
          width: _.num2Px(size),
          height: _.num2Px(size),
          transform: 'rotate(45deg)',
          cursor: 'pointer',
          [colorKey]: '#585858',
          background: color,
          borderRadius: '100%',
          transition: 'transform 0.3s ease'
        },
        events: {
          mouseenter: (el) => {
            el.style.setProperty(colorKey, '#343434');
            el.style.setProperty('transform', 'rotate(135deg)');
          },
          mouseleave: (el) => {
            el.style.setProperty(colorKey, '#585858');
            el.style.setProperty('transform', 'rotate(45deg)');
          },
          mousedown: (el) => el.style.setProperty(colorKey, 'black'),
          mouseup: (el) => el.style.setProperty(colorKey, '#343434'),
        },
        children: [
          {
            style: {
              position: 'absolute',
              left: _.num2Px(2),
              top: _.num2Px((size / 2) - 1),
              width: _.num2Px(size - 4),
              height: _.num2Px(2),
              background: `var(${colorKey})`
            }
          },
          {
            style: {
              position: 'absolute',
              top: _.num2Px(2),
              left: _.num2Px((size / 2) - 1),
              height: _.num2Px(size - 4),
              width: _.num2Px(2),
              background: `var(${colorKey})`
            }
          }
        ]
      });
    },
    modal: (props) => {
      const { color, onClose, label } = props;
      return Spawn({
        style: {
          background: '#ffffff',
          width: '400px',
          height: '250px',
          borderRadius: '4px'
        },
        children: [
          () => Spawn({
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              background: color,
              height: '30px',
              alignItems: 'center',
              padding: '0 10px',
              color: '#ffffff',
              borderRadius: '4px 4px 0 0'
            },
            children: [
              {
                children: [label]
              },
              {
                events: {
                  click: onClose
                },
                children: [_.render.btnClose]
              }
            ]
          }),
          () => Spawn({
            style: {
              padding: '10px'
            },
            children: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']
          })
        ]
      });
    }
  }
};

const Spawn = (structure = {}, i = 0) => {
  if (typeof structure === 'string') {
    return document.createTextNode(structure);
  }

  if (typeof structure === 'function') {
    return structure();
  }

  const {
    style = {},
    type = 'div',
    children = [],
    events = {}
  } = structure;

  const el = document.createElement(type);
  children.forEach(child => {
    el.appendChild(Spawn(child, i + 1));
  });

  el.setAttribute('style', _.getStyle(style));

  _.addEvents(el, events);


  return el;
};

class MyApp {
  constructor() {
    const structure = {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
      },
      children: [
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '350px'
          },
          children: [
            () => _.render.btn({
              label: 'Show Modal 1',
              color: '#8139ec',
              modalProps: {
                color: '#8139ec',
                label: 'Modal 1'
              }
            }),
            () => _.render.btn({
              label: 'Show Modal 2',
              color: '#ec6239',
              modalProps: {
                color: '#ec6239',
                label: 'Modal 2'
              }
            }),
            () => _.render.btn({
              label: 'Show Modal 3',
              color: '#ec3939',
              modalProps: {
                color: '#ec3939',
                label: 'Modal 3'
              }
            })
          ]
        }
      ]
    };

    document.body.append(Spawn(structure));
    document.body.setAttribute('style', 'background: #3c3c3c');
  }
}

const start = new MyApp();