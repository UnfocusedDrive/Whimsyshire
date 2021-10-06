export default class {
  constructor(props) {
    const { parentEl } = props;
    console.log('test!', props);

    const el = document.createElement('div');
    el.innerHTML = 'LOADED!';

    parentEl.appendChild(el);
  }
}