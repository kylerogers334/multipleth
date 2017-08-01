const fs = require('fs');

// const text = fs.readFileSync('./data/state_unemployment.txt','utf-8');
// console.log(text)

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./data/state_unemployment.txt')
});
let str = '';

lineReader.on('line', function (line) {
    if (line !== '') {
        if (Number.isNaN(Number(line))){
            str += `VALUES('${line}', `;
        } else {
            str += `${line}), \n`;
        }
    }
});

setTimeout(() => {
    fs.writeFileSync('./data/test.txt', str, function (err) {
        if (err) return console.log(err);
    });
    
}, 2000);
