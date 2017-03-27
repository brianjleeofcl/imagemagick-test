const request = require('request');
const fs = require('fs');
const path = require('path');
const im = require('gm').subClass({imageMagick: true});

const url = function (num) {
  const str = `000${num}`.slice(-3)
  return `https://s3.amazonaws.com/brianjleeofcl-capstone/k8mep2bMyJ-${str}.jpg`
}

const file = function (num) {
  const str = `000${num}`.slice(-3)
  return `k8mep2bMyJ-${str}.jpg`
}

const requests = [1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(num => new Promise((resolve, reject) => request(url(num))
  .pipe(fs.createWriteStream(path.join(__dirname, 'source', file(num))))
  .on('finish', () => {
    console.log(`${num} finished writing`)
    resolve()
  })
  .on('error', reject)
))

Promise.all(requests).then(() => im(path.join(__dirname, 'source', '*.jpg'))
  .delay(10).write(
    path.join(__dirname, 'output', 'k8mep2bMyJ.gif'),
    function (err) {
      if (!err) {
        console.log('done')
      } else {
        console.error(err)
      }
    }
  )
)
