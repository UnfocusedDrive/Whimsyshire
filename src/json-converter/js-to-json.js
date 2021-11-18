export default {
  getChunkProps: arr => {
    const props = {};
    const rows = arr.join('').split(',');
    rows.forEach(row => {
      const [key, value] = row.split(':');
      props[key] = value.replace(/^'|'$/g, '')
    });

    return props;
  },
  getObjArray: function(arr = []) {
    const newArr = [];
    arr.forEach((char, index) => {
      if (char === '{') {
        const start = index + 1;
        const testArr = arr.slice(start);
        const end = testArr.indexOf('}');
        const chunk = testArr.slice(0, end);
        const props = this.getChunkProps(chunk);
        newArr.push(props);
      }
    });

    return newArr;
  },
  getObjFromArr: function(arr, level = 0) {
    let newArr = [];

    if (!level && arr[0] === '[') {
      const open = arr.indexOf('[') + 1;
      const close = arr.lastIndexOf(']');
      const nestedArr = arr.slice(open, close);
      const res = this.getObjFromArr(nestedArr, level + 1);

      newArr = [
        ...res
      ];
    }

    if (level && arr[0] === '{') {
      const res = this.getObjArray(arr);
      newArr = [
        ...res
      ];
    }

    return newArr;
  },
  getArrFromStr: str => str.replace(/\n/g,' ').trim().replace(/\s+/g, '').split(''),
  get: function(str) {
    const arr = this.getArrFromStr(str);
    const obj = this.getObjFromArr(arr);
    return JSON.stringify(obj, null, 2);
  }
}
