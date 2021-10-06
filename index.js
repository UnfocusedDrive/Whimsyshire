// App Splash (Mountain)
import App from './whimsyshire/index.js';

const run = new App({
  el: document.body
});

console.log('App', run, App);


async function runMe() {
  console.log('hii');
  const { default: x } = await import('./MuckAround/index.js');
  console.log('x', x);
  const { default: y } = await import('./js-calculator/index.js');
  console.log('y', y);


  const run = new y({
    calculatorProps: {
      // Start Input Value for Calculator
      // testing
      // input: tests[1]
      // USE this for final demo
      input: '45+(1250*100)/10'
    }
  });

}

// runMe();

function aboutHandler() {
  //Do stuff--e.g. get via AJAX -> render template (optional) -> append HTML to an element
  console.log('aboutHandler');
}

function newsHandler() {
  //Do stuff
  console.log('newsHandler');

}

function productsHandler() {
  console.log('productsHandler');

  //Do stuff
}

function locationHashChanged() {
  console.log('locationHashChanged', location.hash);
  // (location.hash === "#/about/") && aboutHandler();
  (location.hash === "#/about/") && runMe();
  (location.hash === "#/news/") && newsHandler();
  (location.hash === "#/products/") && productsHandler();
}

window.onhashchange = locationHashChanged;
// window.onload = function (event) {
  // window.location.hash = "#/about/";
// };
