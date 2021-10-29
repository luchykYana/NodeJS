const S3 = require('aws-sdk/clients/s3');
const path = require('path');

const {nanoid} = require('nanoid');

const {config} = require('../configs');

const {
    AWS_S3_REGION,
    AWS_S3_NAME,
    AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY
} = config;

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file = {}, itemType, itemId) => {
        console.log(file);

        const {name, data, minetype} = file;

        const uploadPath = _fileNameBuilder(name, itemType, itemId);

        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: minetype,
                ACL: 'public-read'
            })
            .promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = path.extname(fileName);

    return path.join(itemType, itemId, `${nanoid()}${fileExtension}`);
}
