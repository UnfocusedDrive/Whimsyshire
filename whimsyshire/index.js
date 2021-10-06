import Spawn from '../Spawn/index.js';

// console.log('Spawn', Spawn);


const apps = [
  {
    label: 'JS Calculator',
    description: ' sjlfs f jasdlf jkasf lkdj',
    events: {
      click: () => import('../js-calculator/index.js').then(data => console.log('data', data))
    }
  },
  {
    label: 'Kombat JS',
    description: ' sjlfs f jasdlf jkasf lkdj'
  }
];


const appCards = apps.map(({ label, description, events }, i) => {
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
    events,
    style
  });
  // return app.label;
})

export default class App {
  constructor(props) {
    const { el } = props;

    const content = Spawn({
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
            children: appCards,
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
    el.appendChild(content);
    el.style.background = '#2c2541';
    // el.style.margin = '0 auto';
    console.log('props', el, content, props);

    return content;
  }
}