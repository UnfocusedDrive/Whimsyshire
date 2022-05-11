/**
 * Warp!
 */
export default class {
  constructor(props) {
    const { parentEl } = props;
    console.log('warped in!', props);

    const el = document.createElement('div');
    el.innerHTML = 'LOADED!';

    parentEl.appendChild(el);
  }
}