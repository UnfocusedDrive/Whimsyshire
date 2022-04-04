import Spawn, { Mount, Respawn } from "@unfocused/spawn";
import KombatJSApp from "@unfocused/kombatjs/lib/index.js";
import TestApp from "../test-app";

const CONSTANT = {
  SPACING: 30
};


const apps = [
  // {
  //   label: 'Warp Gate',
  //   description: 'Sample App Template',
  //   path: `${APP_PATH}warp-gate/index.js`,
  //   route: 'warp-gate'
  // },
  // {
  //   label: 'Spawn Table',
  //   description: 'Using Spawn Engine with sample APIs.',
  //   path: `${APP_PATH}spawn-table/index.js`,
  //   route: 'spawn-table'
  // },
  // {
  //   label: 'JS Calculator',
  //   description: ' sjlfs f jasdlf jkasf lkdj',
  //   path: `${APP_PATH}js-calculator/index.js`,
  //   route: 'js-calculator'
  // },
   {
    label: 'Kombat JS',
    description: 'Prepare for Kombat.',
    id: 'kombatjs',
    module: KombatJSApp
  },
  {
    label: 'Test App',
    description: ' sjlfs f jasdlf jkasf lkdj',
    id: 'test-app',
    module: TestApp
    // path: `${APP_PATH}muck/index.js`,
    // route: 'muck'
  }
];


/**
 * Whimsyshire App Launcher
 */
 export default class App {
  constructor() {
    this.insertHelmet();
    this.el = this.render();
    this.subView = null;

    return this;
  }

  handleLaunchApp = (props) => {
    const { module } = props;
    this.el = Respawn(this.el, Spawn());
    this.subView = new module({
      mountEl: this.el
    });
  }

  renderTitle() {
    const title = 'Whimsyshire';

    // https://planetcalc.com/5799/
    const colors = [
      '#ff0000',
      '#ff8000',
      '#ffff00',
      '#80ff00',
      '#00ff00',
      '#00ff80',
      '#00ffff',
      '#0080ff',
      '#0000ff',
      '#8000ff',
      '#ff00ff'
    ];

    // TODO: Add animation to make it sparkle *insert sunglasses of cool here*
    return title.split('').map((character, i) => Spawn({
      tag: 'span',
      children: character,
      style: {
        color: colors[i]
      }
    }))
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
              padding: 4,
              cursor: 'pointer'
            },
            events: {
              mouseenter: (e, el) => {
                el.style.background = '#0082ad'
              },
              mousedown: (e, el) => {
                el.style.background = '#005c7a'
              },
              mouseup: (e, el) => {
                el.style.background = '#0082ad'
              },
              mouseleave: (e, el) => {
                el.style.background = '#00a7de'
              }
            }
          })
        ],
        events: {
          click: () => this.handleLaunchApp(props),
          mouseenter: (e, el) => {
            el.style.background = 'rgb(255 255 255 / 24%)'
          },
          mouseleave: (e, el) => {
            el.style.background = 'rgb(255 255 255 / 12%)'
          }
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgb(255 255 255 / 12%)',
          textAlign: 'center',
          borderRadius: 4,
          padding: 10,
          color: 'white',
          width: 200,
          transition: 'all 0.3s ease'
        }
      });
    });
  }

  render() {
    return Spawn({
      children: Spawn({
        children: [
          Spawn({
            children: [
              Spawn({
                children: this.renderTitle(),
                style: {
                  fontSize: 18
                }
              }),
              Spawn({
                children: 'Select app to open.',
                style: {
                  marginTop: 15
                }
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
  }

  insertHelmet() {
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
    document.body.style.fontSize = 14;
  }
 }