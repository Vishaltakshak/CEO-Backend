
import AWS from 'aws-sdk';


const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRECT_KEY,
    region:process.env.AWS_REGION
});

module.exports = s3;
