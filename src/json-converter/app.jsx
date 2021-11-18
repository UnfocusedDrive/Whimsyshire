// reference: https://www.convertsimple.com/convert-javascript-to-json/
// use code-mirror ...

import { set } from 'lodash';
import React from 'react';
import { Layout, Title } from '@nurvus/ui';

import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');


function getChunkProps(arr) {
  const props = {};
  const rows = arr.join('').split(',');
  rows.forEach(row => {
    const [key, value] = row.split(':');
    props[key] = value.replace(/^'|'$/g, '')
  });

  // console.log('getChunkProps', props);
  return props;
}


function getObjArray(arr = []) {
  // console.log('getObjArray', arr);
  const newArr = [];
  arr.forEach((char, index) => {
    if (char === '{') {
      const start = index + 1;
      const testArr = arr.slice(start);
      const end = testArr.indexOf('}');
      const chunk = testArr.slice(0, end);
      const props = getChunkProps(chunk);
      newArr.push(props);
    }
  });

  // console.log('getObjArray', newArr);

  return newArr;
}

function getObjTree(arr, level = 0) {
  let newArr = [];

  if (!level && arr[0] === '[') {
    const open = arr.indexOf('[') + 1;
    const close = arr.lastIndexOf(']');
    const nestedArr = arr.slice(open, close);
    const res = getObjTree(nestedArr, level + 1);

    // console.log('res', res);
    newArr = [
      ...res
    ];
  }

  if (level && arr[0] === '{') {
    const res = getObjArray(arr);
    // newArr.push(res);
    newArr = [
      ...res
    ];

    // debugger
  }

  // console.log('getObjTree', level, newArr, arr, level);

  return newArr;
}

function JSObj2JSON(str) {
  const formatted = str
    // line breaks
    .replace(/\n/g,' ')
    // white space
    .trim()
    // reduce multi spaces to no spcaes
    .replace(/\s+/g, "")
    .split('');



    const tree = getObjTree(formatted);
  // console.log('JSObj2JSON', JSON.stringify(tree), {formatted, str, tree});


  return JSON.stringify(tree, null, 2);
}


export default function App () {

  const obj = [
    {
      label: 'Warp Gate',
      description: 'Sample App Template',
      path: '../warp-gate/index.js',
      route: 'warp-gate'
    },
    {
      label: 'Spawn Table',
      description: 'Using Spawn Engine with sample APIs.',
      path: '../spawn-table/index.js',
      route: 'spawn-table'
    },
    {
      label: 'JS Calculator',
      description: ' sjlfs f jasdlf jkasf lkdj',
      path: '../js-calculator/index.js',
      route: 'js-calculator'
    },
    {
      label: 'Kombat JS',
      description: ' sjlfs f jasdlf jkasf lkdj'
    },
    {
      label: 'Muck',
      description: ' sjlfs f jasdlf jkasf lkdj',
      path: '../muck/index.js',
      route: 'muck'
    }
  ];


  const test = `[
    {
      label: 'Warp Gate',
      description: 'Sample App Template',
      path: '../warp-gate/index.js',
      route: 'warp-gate'
    },
    {
      label: 'Spawn Table',
      description: 'Using Spawn Engine with sample APIs.',
      path: '../spawn-table/index.js',
      route: 'spawn-table'
    },
    {
      label: 'JS Calculator',
      description: ' sjlfs f jasdlf jkasf lkdj',
      path: '../js-calculator/index.js',
      route: 'js-calculator'
    },
    {
      label: 'Kombat JS',
      description: ' sjlfs f jasdlf jkasf lkdj'
    },
    {
      label: 'Muck',
      description: ' sjlfs f jasdlf jkasf lkdj',
      path: '../muck/index.js',
      route: 'muck'
    }
  ]`;

  const [sourceStr, setSourceStr] = React.useState(test);
  // const converted = JSON.stringify(sourceStr, null, 2);
  // console.log('sourceStr', converted, sourceStr);


  const transform = JSObj2JSON(sourceStr);
  console.log('transform', sourceStr, transform);


  const defVal = '<h1>I ♥ react-codemirror2</h1>';
  return (
    <Layout style={{ padding: 20 }}>
      <Title>
        OBJ 2 JSON Converter
      </Title>
      <Layout display="flex" itemSpacing={ 40 }>
        <Layout>
          <Title level={ 2 }>
            INPUT OBJ
          </Title>
          <CodeMirror
            value={ sourceStr }
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {

              console.log('CodeMirror', {editor, data, value})
              setSourceStr(value);
            }}
          />
        </Layout>
        <Layout>
          <Title level={ 2 }>
            OUTPUT JSON
          </Title>
          <CodeMirror
            value={ transform }
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true
            }}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}