import Spawn from '../../node_modules/@nurvus/spawn/index.js';

/**
 * Warp!
 */
 export default class {
  constructor(props) {
    const { parentEl } = props;

    const el = Spawn('You have spawned something!');
    console.log('warped in!', props, Spawn, el);

    parentEl.appendChild(el);
  }
}