// App Splash (Mountain)
import Spawn, { Mount } from '@unfocused/spawn';
import Whimsyshire from '../apps/whimsyshire/index.js';

const app = new Whimsyshire({
  parentEl: document.body
});

Mount(document.body, app.el);