import Spawn from '../../Spawn/index.js';

// console.log('Spawn', Spawn);


const apps = [
  {
    label: 'Test',
    description: ' sjlfs f jasdlf jkasf lkdj',
    path: '../test/index.js',
    route: 'test'
  },
  {
    label: 'JS Calculator',
    description: ' sjlfs f jasdlf jkasf lkdj',
    path: '../js-calculator/index.js',
    route: 'js-calculator'
    // events: {
    //   click: () => import('../../js-calculator/index.js').then(({default: app}) => {
    //     console.log('app', app);

    //     const run = new app({
    //       calculatorProps: {
    //         // Start Input Value for Calculator
    //         // testing
    //         // input: tests[1]
    //         // USE this for final demo
    //         input: '45+(1250*100)/10'
    //       }
    //     });

    //   })
    // }
  },
  {
    label: 'Kombat JS',
    description: ' sjlfs f jasdlf jkasf lkdj'
  }
];

// const appCards = apps.map(({ label, description, events }, i) => {
//   let style = {
//     background: '#3d3455',
//     textAlign: 'center',
//     borderRadius: 4,
//     padding: 10,
//     color: 'white'
//   };

//   if (i) {
//     style = {
//       ...style,
//       marginLeft: 20
//     };
//   }

//   return Spawn({
//     children: [
//       Spawn({
//         children: label
//       }),
//       Spawn({
//         children: description
//       }),
//       Spawn({
//         tag: 'button',
//         children: 'Open',
//         style: {
//           marginTop: 15,
//           background: '#00a7de',
//           color: 'white',
//           width: '100%',
//           border: 'none',
//           borderRadius: 4,
//           padding: 4
//         }
//       })
//     ],
//     events,
//     style
//   });
//   // return app.label;
// })

export default class App {
  constructor(props) {
    const { route, parentEl } = props;

    const el = Spawn({
      children: Spawn({
        children: [
          Spawn({
            children: [
              Spawn({
                children: 'Whimsyshire'
              }),
              Spawn({
                children: 'Select app to open.'
              })
            ]
          }),
          Spawn({
            children: this.renderAppCards(),
            className: 'cards',
            style: {
              display: 'flex',
              marginTop: 20
            }
          })
        ],
        className: 'content',
        style: {
          textAlign: 'center',
          color: 'white'
          // display: 'flex'
        }
      }),
      className: 'whymsyshire',
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }
    });
    parentEl.appendChild(el);
    parentEl.style.background = '#2c2541';
    // el.style.margin = '0 auto';
    // console.log('props', el, content, props);

    this.state = {
      el,
      parentEl
    };


    if (route) {
      const app = apps.filter(app => app.route === route)[0];
      this.handleLaunchApp(app);
    }

    console.log('App', this, props);

    return this;
  }

  handleLaunchApp = (props) => {
    const { path, route } = props;
    import(path).then(({default: app}) => {
      // this.el = null;

      // clear existing
      this.state.parentEl.innerHTML = '';

      const run = new app({
        parentEl: this.state.parentEl
      });

      console.log('handleLaunchApp', path, run, app, this);
      window.location.hash = `!/${route}`;

      // ... seems to work....
    });

  }

  renderAppCards() {
    return apps.map((props, i) => {
      const { label, description, events, path } = props;

      let style = {
        background: '#3d3455',
        textAlign: 'center',
        borderRadius: 4,
        padding: 10,
        color: 'white'
      };

      if (i) {
        style = {
          ...style,
          marginLeft: 20
        };
      }

      return Spawn({
        children: [
          Spawn({
            children: label
          }),
          Spawn({
            children: description
          }),
          Spawn({
            tag: 'button',
            children: 'Open',
            style: {
              marginTop: 15,
              background: '#00a7de',
              color: 'white',
              width: '100%',
              border: 'none',
              borderRadius: 4,
              padding: 4
            }
          })
        ],
        events: {
          click: () => this.handleLaunchApp(props)
          // click: () => import(path).then(({default: app}) => {
          //   console.log('app', app);

          //   const run = new app({
          //     calculatorProps: {
          //       // Start Input Value for Calculator
          //       // testing
          //       // input: tests[1]
          //       // USE this for final demo
          //       input: '45+(1250*100)/10'
          //     }
          //   });
          // })
        },
        style
      });
      // return app.label;
    });
  }
}