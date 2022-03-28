import Spawn from "@unfocused/spawn";
import KombatJSApp from "@unfocused/kombatjs/lib/index.js";

/**
 * Whimsyshire App Launcher
 */
 export default class App {
  constructor() {

    const run = new KombatJSApp({
      mountEl: document.body,
    });

    return this;
  }
 }