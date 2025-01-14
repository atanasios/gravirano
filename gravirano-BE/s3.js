import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const uploadFile = async (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
    };

    try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log("File uploaded successfully:", data);
        return data;
    } catch (err) {
        console.error("Error uploading file:", err);
        throw err;
    }
};