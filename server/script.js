const fs = require('fs');

// const text = fs.readFileSync('./data/state_unemployment.txt','utf-8');
// console.log(text)

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./data/county_unemployment.txt')
});
let str = '';

lineReader.on('line', function (line) {
    line = line.split('|').map(l => l.trim());
    // console.log(line[1], line[2]);
    const county = line[3].split(' ');
    var adjusted = county.slice(0, (county.length - 2))
    str += `('${line[1] + line[2]}', `;
    str += `'${String(adjusted).split(',').join(' ')}', `;
    str += `'${county[county.length - 1]}', `;
    str += `${line[5].split(',').join('')}, `;
    str += `${line[6].split(',').join('')}, `;
    str += `${line[8]}), \n`;
});
// console.log(str);
setTimeout(() => {
    fs.writeFileSync('./data/test.txt', str, function (err) {
        if (err) return console.log(err);
    });
    // console.log(str);
}, 3000);

// lineReader.on('line', function (line) {
//     if (line !== '') {
//         if (Number.isNaN(Number(line))){
//             str += `VALUES('${line}', `;
//         } else {
//             str += `${line}), \n`;
//         }
//     }
// });
// setTimeout(() => {
//     fs.writeFileSync('./data/test.txt', str, function (err) {
//         if (err) return console.log(err);
//     });
    
// }, 2000);
