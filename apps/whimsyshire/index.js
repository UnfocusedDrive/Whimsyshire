import Spawn from '../../Spawn/index.js';

const CONSTANT = {
  SPACING: 30
};

const apps = [
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
  }
];

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
            className: 'cards-container',
            style: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: CONSTANT.SPACING,
              gap: CONSTANT.SPACING
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

    // console.log('App', this, props);

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

      // console.log('handleLaunchApp', path, run, app, this);
      window.location.hash = `!/${route}`;

      // ... seems to work....
    });

  }

  renderAppCards() {
    return apps.map((props, i) => {
      const { label, description, events, path } = props;

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
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#3d3455',
          textAlign: 'center',
          borderRadius: 4,
          padding: 10,
          color: 'white',
          width: 200
        }
      });
    });
  }
}