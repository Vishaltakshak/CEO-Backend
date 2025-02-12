import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

//multer config

const storage = multer.memoryStorage();

export const upload = multer({ storage:storage });
// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRECT_KEY,
  region: process.env.AWS_REGION,
  
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${Date.now()}_${file.originalname}`;
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `user/${fileName}`, // Save in an 'uploads/' folder in the bucket
      Body: file.buffer,
      ContentType: file.mimetype,
      // Make the file publicly accessible
    };

    
    const uploadResult = await s3.upload(s3Params).promise();

    // Return success response with the file URL
    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: uploadResult.Location,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
