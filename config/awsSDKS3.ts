/*
 * Refrence for configure AWS S3 with expressJS
 * https://javascript.plainenglish.io/how-to-upload-files-to-an-s3-bucket-in-a-vue-js-app-and-save-to-mongodb-a-beginners-guide-dfada815b7eb
 */

import awsS3 from "aws-sdk/clients/s3";

const s3 = new awsS3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

export { s3 };
