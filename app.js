const fs = require('fs');
const path = require('path');

const firstPath = path.join(__dirname, 'files', 'boys');
const secondPath = path.join(__dirname, 'files', 'girls');

function inspectionAndReplacement(pathNeedGender, pathGender, gender) {
    fs.readdir(pathNeedGender, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        data.forEach(fileName => {
            const startPath = path.join(pathNeedGender, fileName);

            fs.readFile(startPath , (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const genderFromJSON = JSON.parse(data.toString()).gender;

                if(genderFromJSON === gender){
                    fs.rename(
                        startPath,
                        path.join(pathGender, fileName),
                        (err) => {
                            if(err){
                                console.log(err);
                            }
                        }
                    )
                }
            });
        })
    })
}

inspectionAndReplacement(firstPath,secondPath,'female');
inspectionAndReplacement(secondPath,firstPath,'male');