const fs = require('fs');
const source = fs.readFileSync('../Buffer/cat.jpg');

fs.writeFileSync('copy_cat.jpg', source);