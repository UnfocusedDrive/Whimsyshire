import Spawn, { Mount } from '@unfocused/spawn';

/**
 * Test App!
 */
 export default class {
  constructor(props) {
    const { mountEl } = props;

    Mount(mountEl, Spawn({
      children: 'LOADED!'
    }))

  }
}