const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);

async function read(path){
    const buffer = await readFilePromise(path);

    return JSON.parse(buffer.toString());
}

async function write(path, data){
    await fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = {read, write};