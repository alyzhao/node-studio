const fs = require('fs');
const path = require('path');

const stat = fs.statSync(path.resolve(__dirname, '../Stream'));

console.log(stat);

let birthtime = new Date(stat.birthtime).getTime();

console.log('birthtime', birthtime);

console.log('sync');
