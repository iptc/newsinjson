import {  compileFromFile } from 'json-schema-to-typescript'
const fs = require ('fs')

// compile from file
compileFromFile('ninjs-schema_2.0.json')
  .then(ts => fs.writeFileSync('ninjs20.ts',ts))