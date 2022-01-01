import { s3 } from "../config/awsSDKS3";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import multerS3 from "multer-s3";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET ?? "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (_, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_, file, cb) => {
      cb(null, `${uuidv4()}-${file.originalname}`);
    },
  }),
});

export { upload };
