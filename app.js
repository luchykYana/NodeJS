const fs = require('fs');
const path = require('path');

const firstPath = path.join(__dirname, 'files', 'boys');
const secondPath = path.join(__dirname, 'files', 'girls');


function InspectionAndReplacement(pathNeedGender, pathGender, gender) {

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

                if(JSON.parse(data.toString()).gender === gender){
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

InspectionAndReplacement(firstPath,secondPath,'female');
InspectionAndReplacement(secondPath,firstPath,'male');