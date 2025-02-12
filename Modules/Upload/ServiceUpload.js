import AWS from 'aws-sdk';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Multer Configuration for Memory Storage
const storage = multer.memoryStorage();
export const uploadService = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, 
});

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRECT_KEY,
    region: process.env.AWS_REGION,
});

// Function to Upload Files to S3
export const uploadImage = async (file, folder) => {
  try {
    const fileName = `${Date.now()}_${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${fileName}`, // Folder structure in S3
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location; // Return the S3 URL
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
};

// Function to Handle Multiple Files Upload
export const handleFileUpload = async (req, res) => {
  try {
    const { BannerIMG, ServiceIMG } = req.files;

    if (!BannerIMG && !ServiceIMG) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const bannerImageUrl = BannerIMG ? await uploadImage(BannerIMG[0], 'banners') : null;
    const serviceImageUrl = ServiceIMG ? await uploadImage(ServiceIMG[0], 'services') : null;

    res.status(200).json({
      message: 'Files uploaded successfully',
      urls: {
        BannerIMG: bannerImageUrl,
        ServiceIMG: serviceImageUrl,
      },
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};
