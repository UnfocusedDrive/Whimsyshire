import Spawn from '../Spawn/index.js';

// console.log('Spawn', Spawn);


const apps = [
  {
    label: 'JS Calculator',
    description: ' sjlfs f jasdlf jkasf lkdj'
  },
  {
    label: 'Kombat JS',
    description: ' sjlfs f jasdlf jkasf lkdj'
  }
];


const appEls = apps.map(app => {
  return Spawn({ children: app.label});
  // return app.label;
})

export default class App {
  constructor(props) {
    const { el } = props;

    const content = Spawn({ children: appEls});
    el.appendChild(content);
    console.log('props', el, content, props);

    return content;
  }
}