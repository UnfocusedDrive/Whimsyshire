/**
 * NIHONGO // JAPANESE
 *
 * Hiragana to Romanji or revserse.
 *
 *
 * GOOd ref: https://www.lexilogos.com/keyboard/hiragana.htm
 *
 * TODO:
 *  - Now make 'ko' tansform.
 *
 *
 *
 */


const tests = [
  {
    input: 'konnichiwa',
    expected: 'こんにちわ'
  },
  {
    input: 'Watashi wa no name wa John desu.',
    expected: 'わたし わ の なめ わ じょhん です。'
  }
]

// src: https://gist.github.com/mdzhang/899a427eb3d0181cd762
const hiragana = [
  {
    "kana": "あ",
    "roumaji": "a",
    "type": "gojuuon"
  },
  {
    "kana": "い",
    "roumaji": "i",
    "type": "gojuuon"
  },
  {
    "kana": "う",
    "roumaji": "u",
    "type": "gojuuon"
  },
  {
    "kana": "え",
    "roumaji": "e",
    "type": "gojuuon"
  },
  {
    "kana": "お",
    "roumaji": "o",
    "type": "gojuuon"
  },
  {
    "kana": "か",
    "roumaji": "ka",
    "type": "gojuuon"
  },
  {
    "kana": "き",
    "roumaji": "ki",
    "type": "gojuuon"
  },
  {
    "kana": "く",
    "roumaji": "ku",
    "type": "gojuuon"
  },
  {
    "kana": "け",
    "roumaji": "ke",
    "type": "gojuuon"
  },
  {
    "kana": "こ",
    "roumaji": "ko",
    "type": "gojuuon"
  },
  {
    "kana": "さ",
    "roumaji": "sa",
    "type": "gojuuon"
  },
  {
    "kana": "し",
    "roumaji": "shi",
    "type": "gojuuon"
  },
  {
    "kana": "す",
    "roumaji": "su",
    "type": "gojuuon"
  },
  {
    "kana": "せ",
    "roumaji": "se",
    "type": "gojuuon"
  },
  {
    "kana": "そ",
    "roumaji": "so",
    "type": "gojuuon"
  },
  {
    "kana": "た",
    "roumaji": "ta",
    "type": "gojuuon"
  },
  {
    "kana": "ち",
    "roumaji": "chi",
    "type": "gojuuon"
  },
  {
    "kana": "つ",
    "roumaji": "tsu",
    "type": "gojuuon"
  },
  {
    "kana": "て",
    "roumaji": "te",
    "type": "gojuuon"
  },
  {
    "kana": "と",
    "roumaji": "to",
    "type": "gojuuon"
  },
  {
    "kana": "な",
    "roumaji": "na",
    "type": "gojuuon"
  },
  {
    "kana": "に",
    "roumaji": "ni",
    "type": "gojuuon"
  },
  {
    "kana": "ぬ",
    "roumaji": "nu",
    "type": "gojuuon"
  },
  {
    "kana": "ね",
    "roumaji": "ne",
    "type": "gojuuon"
  },
  {
    "kana": "の",
    "roumaji": "no",
    "type": "gojuuon"
  },
  {
    "kana": "は",
    "roumaji": "ha",
    "type": "gojuuon"
  },
  {
    "kana": "ひ",
    "roumaji": "hi",
    "type": "gojuuon"
  },
  {
    "kana": "ふ",
    "roumaji": "hu",
    "type": "gojuuon"
  },
  {
    "kana": "へ",
    "roumaji": "he",
    "type": "gojuuon"
  },
  {
    "kana": "ほ",
    "roumaji": "ho",
    "type": "gojuuon"
  },
  {
    "kana": "ま",
    "roumaji": "ma",
    "type": "gojuuon"
  },
  {
    "kana": "み",
    "roumaji": "mi",
    "type": "gojuuon"
  },
  {
    "kana": "む",
    "roumaji": "mu",
    "type": "gojuuon"
  },
  {
    "kana": "め",
    "roumaji": "me",
    "type": "gojuuon"
  },
  {
    "kana": "も",
    "roumaji": "mo",
    "type": "gojuuon"
  },
  {
    "kana": "や",
    "roumaji": "ya",
    "type": "gojuuon"
  },
  {
    "kana": "ゆ",
    "roumaji": "yu",
    "type": "gojuuon"
  },
  {
    "kana": "よ",
    "roumaji": "yo",
    "type": "gojuuon"
  },
  {
    "kana": "ら",
    "roumaji": "ra",
    "type": "gojuuon"
  },
  {
    "kana": "り",
    "roumaji": "ri",
    "type": "gojuuon"
  },
  {
    "kana": "る",
    "roumaji": "ru",
    "type": "gojuuon"
  },
  {
    "kana": "れ",
    "roumaji": "re",
    "type": "gojuuon"
  },
  {
    "kana": "ろ",
    "roumaji": "ro",
    "type": "gojuuon"
  },
  {
    "kana": "わ",
    "roumaji": "wa",
    "type": "gojuuon"
  },
  {
    "kana": "を",
    "roumaji": "wo",
    "type": "gojuuon"
  },
  {
    "kana": "ん",
    "roumaji": "n",
    "type": "gojuuon"
  },
  {
    "kana": "が",
    "roumaji": "ga",
    "type": "dakuon"
  },
  {
    "kana": "ぎ",
    "roumaji": "gi",
    "type": "dakuon"
  },
  {
    "kana": "ぐ",
    "roumaji": "gu",
    "type": "dakuon"
  },
  {
    "kana": "げ",
    "roumaji": "ge",
    "type": "dakuon"
  },
  {
    "kana": "ご",
    "roumaji": "go",
    "type": "dakuon"
  },
  {
    "kana": "ざ",
    "roumaji": "za",
    "type": "dakuon"
  },
  {
    "kana": "じ",
    "roumaji": "ji",
    "type": "dakuon"
  },
  {
    "kana": "ず",
    "roumaji": "zu",
    "type": "dakuon"
  },
  {
    "kana": "ぜ",
    "roumaji": "ze",
    "type": "dakuon"
  },
  {
    "kana": "ぞ",
    "roumaji": "zo",
    "type": "dakuon"
  },
  {
    "kana": "だ",
    "roumaji": "da",
    "type": "dakuon"
  },
  {
    "kana": "ぢ",
    "roumaji": "ji",
    "type": "dakuon"
  },
  {
    "kana": "づ",
    "roumaji": "zu",
    "type": "dakuon"
  },
  {
    "kana": "で",
    "roumaji": "de",
    "type": "dakuon"
  },
  {
    "kana": "ど",
    "roumaji": "do",
    "type": "dakuon"
  },
  {
    "kana": "ば",
    "roumaji": "ba",
    "type": "dakuon"
  },
  {
    "kana": "び",
    "roumaji": "bi",
    "type": "dakuon"
  },
  {
    "kana": "ぶ",
    "roumaji": "bu",
    "type": "dakuon"
  },
  {
    "kana": "べ",
    "roumaji": "be",
    "type": "dakuon"
  },
  {
    "kana": "ぼ",
    "roumaji": "bo",
    "type": "dakuon"
  },
  {
    "kana": "ぱ",
    "roumaji": "pa",
    "type": "handakuon"
  },
  {
    "kana": "ぴ",
    "roumaji": "pi",
    "type": "handakuon"
  },
  {
    "kana": "ぷ",
    "roumaji": "pu",
    "type": "handakuon"
  },
  {
    "kana": "ぺ",
    "roumaji": "pe",
    "type": "handakuon"
  },
  {
    "kana": "ぽ",
    "roumaji": "po",
    "type": "handakuon"
  },
  {
    "kana": "っ",
    "roumaji": "(pause)",
    "type": "sokuon"
  },
  {
    "kana": "きゃ",
    "roumaji": "kya",
    "type": "youon"
  },
  {
    "kana": "きゅ",
    "roumaji": "kyu",
    "type": "youon"
  },
  {
    "kana": "きょ",
    "roumaji": "kyo",
    "type": "youon"
  },
  {
    "kana": "しゃ",
    "roumaji": "sha",
    "type": "youon"
  },
  {
    "kana": "しゅ",
    "roumaji": "shu",
    "type": "youon"
  },
  {
    "kana": "しょ",
    "roumaji": "sho",
    "type": "youon"
  },
  {
    "kana": "ちゃ",
    "roumaji": "cha",
    "type": "youon"
  },
  {
    "kana": "ちゅ",
    "roumaji": "chu",
    "type": "youon"
  },
  {
    "kana": "ちょ",
    "roumaji": "cho",
    "type": "youon"
  },
  {
    "kana": "にゃ",
    "roumaji": "nya",
    "type": "youon"
  },
  {
    "kana": "にゅ",
    "roumaji": "nyu",
    "type": "youon"
  },
  {
    "kana": "にょ",
    "roumaji": "nyo",
    "type": "youon"
  },
  {
    "kana": "ひゃ",
    "roumaji": "hya",
    "type": "youon"
  },
  {
    "kana": "ひゅ",
    "roumaji": "hyu",
    "type": "youon"
  },
  {
    "kana": "ひょ",
    "roumaji": "hyo",
    "type": "youon"
  },
  {
    "kana": "みゃ",
    "roumaji": "mya",
    "type": "youon"
  },
  {
    "kana": "みゅ",
    "roumaji": "myu",
    "type": "youon"
  },
  {
    "kana": "みょ",
    "roumaji": "myo",
    "type": "youon"
  },
  {
    "kana": "りゃ",
    "roumaji": "rya",
    "type": "youon"
  },
  {
    "kana": "りゅ",
    "roumaji": "ryu",
    "type": "youon"
  },
  {
    "kana": "りょ",
    "roumaji": "ryo",
    "type": "youon"
  },
  {
    "kana": "ぎゃ",
    "roumaji": "gya",
    "type": "youon"
  },
  {
    "kana": "ぎゅ",
    "roumaji": "gyu",
    "type": "youon"
  },
  {
    "kana": "ぎょ",
    "roumaji": "gyo",
    "type": "youon"
  },
  {
    "kana": "じゃ",
    "roumaji": "ja",
    "type": "youon"
  },
  {
    "kana": "じゅ",
    "roumaji": "ju",
    "type": "youon"
  },
  {
    "kana": "じょ",
    "roumaji": "jo",
    "type": "youon"
  },
  {
    "kana": "びゃ",
    "roumaji": "bya",
    "type": "youon"
  },
  {
    "kana": "びゅ",
    "roumaji": "byu",
    "type": "youon"
  },
  {
    "kana": "びょ",
    "roumaji": "byo",
    "type": "youon"
  },
  {
    "kana": "ぴゃ",
    "roumaji": "pya",
    "type": "youon"
  },
  {
    "kana": "ぴゅ",
    "roumaji": "pyu",
    "type": "youon"
  },
  {
    "kana": "ぴょ",
    "roumaji": "pyo",
    "type": "youon"
  },
  {
    "kana": "。",
    "roumaji": ".",
    "type": "youon"
  }
];

// const hiraganaMap = {
//   da: 'だ',
//   ba: 'ば',
//   pa: 'ぱ',
//   ki: 'き',
//   i: 'い',
//   ya: 'や',
//   hi: 'ひ',
//   za: 'ざ',
//   ga: 'が',
//   mi: 'み',
//   dji: 'ぢ',
//   bi: 'び',
//   ri: 'り',
//   ra: 'ら',
//   tsu: 'す',
//   u: 'う',
//   ku: 'く',
//   pi: 'ぴ',
//   gi: 'ぎ',
//   ji: 'じ',
//   wi: 'ゐ',
//   ha: 'は',
//   ma: 'ま',
//   na: 'な',
//   ta: 'た',
//   a: 'あ',
//   sa: 'さ',
//   ka: 'か',
//   de: 'で',
//   ko: 'こ',
//   me: 'め',
//   n: 'ん',
//   na: 'な',
//   no: 'の',
//   ni: 'に',
//   chi: 'ち',
//   wa: 'わ',
//   ta: 'た',
//   shi: 'し',
//   su: 'す',
//   '.': '。'
//   // a: 'A----------'
// };


const hiraganaMap = hiragana.reduce((acc, value) => {
  return {
    ...acc,
    [value.roumaji]: value.kana
  };
}, {});


// console.log(simpli, hiraganaMap2, hiraganaMap2);

const defaultStr = '';

const NihongoTransformer = (str) => {
  // constructor(str) {
    const keys = Object.keys(hiraganaMap).map(key => key);
    const sourceArr = str.split('');
    const targetArr = [];

    const getMatchIndex = (keys, arr, index, count = 1) => {
      let str = '';
      for (let i = 0; i < count; i++) {
        str += arr[index + i];
      }

      return keys.indexOf(str.toLowerCase());
    };

    for (let i = 0; i < sourceArr.length; i++) {
      const match1 = getMatchIndex(keys, sourceArr, i, 1);
      const match2 = getMatchIndex(keys, sourceArr, i, 2);
      const match3 = getMatchIndex(keys, sourceArr, i, 3);



      // console.log('match', {
      //   match1,
      //   match2,
      //   match3
      // })

      let val;
      if (match3 > -1) {
        val = hiraganaMap[keys[match3]];
        // skip 2
        i++;
        i++;
      } else if (match2 > -1) {
        val = hiraganaMap[keys[match2]];
        // skip 1
        i++;

      } else if (match1 > -1) {
        val = hiraganaMap[keys[match1]];
      } else {
        val = sourceArr[i];
      }

      targetArr.push(val);
      // console.log('targetArr', val, targetArr);
    }


    const result = targetArr.join('');

    // console.log('str', {
    //   sourceArr,
    //   str,
    //   keys,
    //   targetArr,
    //   result
    // });

    return result;
    // this.result = result;
    // return this;

  // }
}

class MyApp {
  constructor(str) {
    this.el = document.createElement('div');
    document.body.append(this.el);


    document.addEventListener('keydown', this.handleKeyPress);

    this.str = str;
    const transformedTxt = NihongoTransformer(this.str);

    this.el.innerText = transformedTxt;
    console.log('constructor', this.el, this.str, transformedTxt);



  }

  handleKeyPress = (e) => {
    // Remove Last Key
    if (e.key === 'Backspace') {
      this.str = this.str.slice(0, -1);
    } else {
      this.str += e.key;
    }


    const transformedTxt = NihongoTransformer(this.str);
    console.log('handleKeyPress', this.str, transformedTxt);
    this.el.innerText = transformedTxt;
    // debugger
  }
}









const transformed = NihongoTransformer(defaultStr);
const results = tests.forEach(test => {
  const res = NihongoTransformer(test.input);

  if (res !== test.expected) {
    console.log('Test failed!', {
      ...test,
      res
    });
  }
});



const generateButton = (val) => {
  const el = document.createElement('BUTTON');
  el.innerHTML = val;
  document.body.append(el);
};


generateButton(hiraganaMap.ko);

const btns = Object.keys(hiraganaMap).map(key => generateButton(hiraganaMap[key]));



const infoEl = document.createElement('div').innerHTML = 'Type something in Japanese!';
const spaceEl = document.createElement('div');
spaceEl.setAttribute('style', 'height: 20px');
document.body.append(infoEl);
document.body.append(spaceEl);

const app = new MyApp(defaultStr);




// console.log('results', results);