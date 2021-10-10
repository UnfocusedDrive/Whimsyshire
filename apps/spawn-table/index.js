import Spawn from '../../Spawn/index.js';

const CONSTANT = {
  // omdbhapi API Key for John Yagiz
  API_KEY: '2e35fbe6',
  API_URL: 'http://www.omdbapi.com/',
  PLACEHOLDER_IMG: 'https://via.placeholder.com/375x520?text=No%20Img%20Available',
  BACKGROUND_COLOR: '#f0f2f5'
};

const value = 'cat';
const url = `${CONSTANT.API_URL}?apikey=${CONSTANT.API_KEY}&s=${value}&page=1`;

/**
 * Spawn Table
 */
 export default class {
  constructor(props) {
    console.log('SpawnTable!', props);
    const { parentEl } = props;
    const el = Spawn({
      className: 'spawn-table',
      style: {
        padding: 20
      }
    });

    this.state = {
      el,
      parentEl
    };

    el.innerHTML = 'fetching data....';
    parentEl.appendChild(el);
    this.fetch();
  }

  fetch() {
    fetch(url).then(res => {
      console.log('res', res);
      return res.json();
    }).then(res => {
      console.log('res', res);


      this.renderTable(res.Search);
    });
  }

  renderTable(rows) {
    const { el } = this.state;
    el.innerHTML = '';

    el.appendChild(Spawn({
      tag: 'table',
      children: this.renderTableRows(rows),
      style: {
        background: 'rgb(0 0 0 / 15%)',
        // border: '1px solid rgb(0 255 243 / 50%)',
        color: 'white',
        borderCollapse: 'collapse',
        borderRadius: 6,
        fontSize: 14
      }
    }));
  }

  renderTableRows(data) {
    if (data) {
      const res = data.map((row, i) => {
        return {
          tag: 'tr',
          children: this.renderTableRow(row, i)
        };
      });

      console.log('renderTableRows', res, data);

      return res;
    }

    return null;
  }

  renderTableRow(data, i) {
    console.log('renderTableRow', data);

    let style = {
      padding: 10
    };
    if (i) {
      style = {
        ...style,
        background: i % 2 ? 'rgb(255 255 255 / 20%)' : '',
      }
    }

    if (data) {
      const res = Object.keys(data).map((key, i) => {
        return {
          tag: 'td',
          children: data[key],
          style
        };
      });


      return res;
    }

    return null;
  }
}