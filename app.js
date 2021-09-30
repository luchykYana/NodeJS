const fs = require('fs');
const path = require('path');

console.log(__dirname);
const firstPath = path.join(__dirname, 'files', 'boys', 'yura.json');


fs.readFile(firstPath, (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(JSON.parse(data.toString()));
});

