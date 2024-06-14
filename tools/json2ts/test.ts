import Converter from './converter'
const fs = require ('fs')

async function start() {

    //For this test we are using the NewsML-file TT_newsmlg2_sample.xml
    //We read the content and call the converter
    //The converter is designed for this usage of NewsML
    //The interesting part is how the converter use the ninjs20.ts-unit to build the News in JSON item
    //It could be used in other scenarios where you create ninjs items.

    const indata = fs.readFileSync('TT_newsmlg2_sample.xml').toString()

    const converter = new Converter()
    const result: any = await converter.convert(indata)

    console.log (JSON.stringify(result,null,2))

}

start().catch((err) => {
    console.log( err)
  })