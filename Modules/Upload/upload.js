
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3-config';


const Upload = multer({
    storage: multerS3({
        s3: s3,

        bucket: process.env.AWS_BUCKET_NAME,
      
        acl: 'public-read', // 'private' if using presigned URLs
        metadata: (req, file, cb) => {
            if (!req || !file || !cb) {
                throw new Error('Missing required parameter');
            }
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `images/${Date.now().toString()}-${file.originalname}`);
        }
    })
});

module.exports = Upload;
