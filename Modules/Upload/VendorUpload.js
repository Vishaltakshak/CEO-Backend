import AWS from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";

const Storage =multer.memoryStorage();
export const UploadVendor = multer({
    storage:Storage,
    limits: 15*1024*1024
})

const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRECT_KEY,
    region: process.env.AWS_REGION,
});

export const uploadVendorImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${Date.now()}_${file.originalname}`;
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `Vendor/${fileName}`, 
      Body: file.buffer,
      ContentType: file.mimetype,
      
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
