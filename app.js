const fs = require('fs');
const path = require('path');

const manOlderPath = path.join(__dirname, 'manOlder20');
const manYoungerPath = path.join(__dirname, 'manYounger20');
const womanOlderPath = path.join(__dirname, 'womanOlder20');
const womanYoungerPath = path.join(__dirname, 'womanYounger20');

const users = [
    {
        name: 'Olya',
        gender: 'female',
        age: 17
    },
    {
        name: 'Max',
        gender: 'male',
        age: 30
    },
    {
        name: 'Vasya',
        gender: 'male',
        age: 35
    },
    {
        name: 'Nastya',
        gender: 'female',
        age: 25
    },
    {
        name: 'Roma',
        gender: 'male',
        age: 19
    },
    {
        name: 'Dima',
        gender: 'male',
        age: 28
    },
    {
        name: 'Oksana',
        gender: 'female',
        age: 33
    },
    {
        name: 'Sofia',
        gender: 'female',
        age: 18
    },
    {
        name: 'Oleg',
        gender: 'male',
        age: 17
    },
    {
        name: 'Yura',
        gender: 'male',
        age: 38
    }
];

function createFolders(pathOne, pathTwo, pathThree, pathFour) {
    fs.mkdir(pathOne, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        fs.mkdir(pathTwo, (err) => {
            if (err) {
                console.log(err);
                return;
            }

            fs.mkdir(pathThree, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                fs.mkdir(pathFour, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    createFiles(users);
                })
            })
        })
    })
}

function createFiles(arr) {
    arr.forEach(user => {

        if(user.gender === 'male'){

            if(user.age > 20){
                createFile('manOlder20', user);

            }else{
                createFile('manYounger20', user);
            }

        }else{

            if(user.age > 20){
                createFile('womanOlder20', user);

            }else{
                createFile('womanYounger20', user);
            }
        }
    })
}

function createFile(toFolder, user){
    fs.writeFile(path.join(__dirname, toFolder, `${user.name}.txt`), `name: ${user.name}\ngender: ${user.gender}\nage: ${user.age}`, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

createFolders(manOlderPath,manYoungerPath,womanOlderPath,womanYoungerPath);




