import React from 'react';
import ReactDOM from 'react-dom';
import Spawn, { Mount, Respawn } from "@unfocused/spawn";
import KombatJSApp from "@unfocused/kombatjs/lib/index.js";
import JSCalculator from "@unfocused/js-calculator";
import TestApp from "../test-app";
import TextDiff from '../text-diff';

const CONSTANT = {
  SPACING: 30
};

const apps = [
  // IMG SLICER....
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
    label: 'JS Calculator',
    description: 'Show me the numbers!',
    id: 'js-calculator',
    module: JSCalculator
  },
   {
    label: 'Kombat JS',
    description: 'Prepare for Kombat.',
    id: 'kombatjs',
    module: KombatJSApp
  },
  {
    label: 'Test App',
    description: 'What are we testing about?',
    id: 'test-app',
    module: TestApp
    // path: `${APP_PATH}muck/index.js`,
    // route: 'muck'
  },
  {
    label: 'Text Diff',
    description: 'I don\'t see the difference.',
    id: 'text-diff',
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
    this.cards = this.renderAppCards();
    this.el = this.render();
    this.subView = null;

    // Card Load animation (staggered)
    this.cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.top = 0;
      }, 100 * i);
    });

    return this;
  }

  handleLaunchApp = (props) => {
    const { id, module } = props;
    this.el = Respawn(this.el, Spawn());
    switch (id) {
      case 'text-diff':
        ReactDOM.render(<TextDiff />, this.el)
        break;
        case 'js-calculator':
          this.subView = new module({
            parentEl: this.el
          });
          break;
      default:
        this.subView = new module({
          mountEl: this.el
        });
    }
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

  /**
   * Render App Cards
   * @returns {HTMLElement} of App Cards
   */
  renderAppCards() {
    return apps.map((props, i) => {
      const { label, description } = props;

      let top;
      if (i % 2 === 0) {
        top = -800;
      } else {
        top = 800;
      }

      return Spawn({
        children: [
          Spawn({
            children: label
          }),
          Spawn({
            children: description,
            style: {
              marginTop: 10,
              fontSize: 12,
              color: '#31fb40'
            }
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
              click: () => this.handleLaunchApp(props),
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
          mouseenter: (e, el) => {
            el.style.background = 'rgb(255 255 255 / 24%)'
          },
          mouseleave: (e, el) => {
            el.style.background = 'rgb(255 255 255 / 12%)'
          }
        },
        style: {
          position: 'relative',
          opacity: 0,
          top,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgb(255 255 255 / 12%)',
          textAlign: 'center',
          borderRadius: 4,
          padding: 10,
          color: 'white',
          width: 200,
          transition: 'all 0.8s cubic-bezier(0, 0.01, 0, 1.04) 0s'
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
            children: this.cards,
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
 }