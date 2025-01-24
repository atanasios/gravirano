import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIA54WIGCXMTZK4W6SO",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "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",
    },
});

export const uploadFile = async (buffer, originalname, mimetype) => {        
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: originalname,
        Body: buffer,
        ContentType: mimetype
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

export const deleteFile = async (originalname) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: originalname
    };

    try {
        await s3.send(new DeleteObjectCommand(params));

        console.log("File deleted successfully!");
    } catch (error) {
        console.log("Error deleting file", error);
        throw error;
    }
}