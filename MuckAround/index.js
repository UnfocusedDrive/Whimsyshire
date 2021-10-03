const CONSTANT = {
  // omdbhapi API Key for John Yagiz
  API_KEY: '2e35fbe6',
  API_URL: 'http://www.omdbapi.com/',
  PLACEHOLDER_IMG: 'https://via.placeholder.com/375x520?text=No%20Img%20Available',
  BACKGROUND_COLOR: '#f0f2f5'
};

const value = 'cat';


const url = `${CONSTANT.API_URL}?apikey=${CONSTANT.API_KEY}&s=${value}&page=1`;

console.log('start', url);



fetch(url).then(res => {
  console.log('res', res);
  return res.json();
}).then(res => {
  console.log('res', res);
  debugger

})