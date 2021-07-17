/**
 * NIHONGO // JAPANESE
 *
 * Hiragana to Romanji or revserse.
 *
 *
 * TOD:
 *  - Now make 'ko' tansform.
 *
 *
 *
 */




const hiraganaMap = {
  ko: 'KO----',
  a: 'A----------'
};

const defaultStr = 'konichiwa';

class NihongoTransformer {
  constructor(str) {
    // super();

    const sourceArr = str.split('');
    const keys = Object.keys(hiraganaMap).map(key => key);

    const targetArr = [
      ...sourceArr
    ];
    for (let i = 0; i < sourceArr.length; i++) {
      const matchIndex = keys.indexOf(sourceArr[i]);

      if (matchIndex > -1) {
        const hiraganaChar = hiraganaMap[keys[matchIndex]];
        targetArr[i] = hiraganaChar;
        // console.log('test', hiraganaChar, matchIndex, keys[matchIndex]);
      }
    }


    const result = targetArr.join('');

    console.log('str', {
      sourceArr,
      str,
      keys,
      targetArr,
      result
    });

    this.result = result;
    return this;

  }
}

const transformed = new NihongoTransformer(defaultStr).result;

console.log('transformed', transformed);