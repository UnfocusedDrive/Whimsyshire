// 1) JS 2 JSON:
// reference: https://www.convertsimple.com/convert-javascript-to-json/
// 2) CSV 2 JSON .....


import { set } from 'lodash';
import React from 'react';
import { Layout, Title } from '@nurvus/ui';

import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

import JSONConverter from './js-to-json.js';

export default function App ({ source }) {
  const [sourceStr, setSourceStr] = React.useState(source);
  const transform = JSONConverter.get(sourceStr);

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