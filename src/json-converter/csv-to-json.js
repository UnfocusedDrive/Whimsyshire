export default {
  getCols(str) {
    const test = str.split(',');
    return test;
  },
  getRows(colNames, rows) {
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
    })
  },
  get(sourceStr) {
    const test = sourceStr.split('\n');
    const [ cols, ...rows] = test;
    const colNames = this.getCols(cols);
    const data = this.getRows(colNames, rows);

    return {
      sourceStr,
      data,
      json: JSON.stringify(data, null, 2)
    };
  }
}