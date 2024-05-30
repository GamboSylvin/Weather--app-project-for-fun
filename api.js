import https from 'https'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

let fileName = fileURLToPath(import.meta.url)
let dirName = dirname(fileName)
console.log(dirName)

// const __request = https.request("https://api.tomtom.com/map/1/tile/hybrid/main/5/4/8.pbf?key=blny7Oi88tXRjIpqAXZrDP88C94rO6VA",(res)=>{
//     let responseData = ''

//     res.on('data',(chunk)=>{
//         responseData += chunk;
//     })

//     res.on('end',()=>{
//         fs.writeFile('./data.json', JSON.stringify(responseData), err =>{
//             if(err){
//                 console.log(err)
//             }else{
//                 console.log('file has been written')
//             }
//         })
//     })
// })


https.get('https://a.api.tomtom.com/map/1/tile/basic/main/20/16/32.png?key=blny7Oi88tXRjIpqAXZrDP88C94rO6VA', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    let base64Image = d.toString('base64')
    // let imageData = Buffer.from(base64Image, 'base64')
    fs.writeFileSync('./dataResponse.json', JSON.stringify(base64Image))
  });

}).on('error', (e) => {
  console.error(e);
});
