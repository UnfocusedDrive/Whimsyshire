export default {



  getCols(str) {
    const test = str.split(',');
    // console.log('getCols', test, str);

    return test;
  },


  getRows(colNames, rows) {
    // console.log(colNames, rows, this);


    return rows.map(row => {

      return row.split(',').reduce((prev, next, i) => {

        if (colNames[i]) {
          return {
            ...prev,
            [colNames[i]]: next
          }
        }

        return prev;
        const newObj = {
          ...prev,
          [colNames[i]]: next
        }

        return newObj;

      }, {});
      // console.log('row', cols, row);


    })
  },






  get(str) {
    const test = str.split('\n');
    const [ cols, ...rows] = test;
    const colNames = this.getCols(cols);
    const data = this.getRows(colNames, rows);
    console.log('get', data, colNames, test, str);


    return JSON.stringify(data, null, 2);;
  }
}