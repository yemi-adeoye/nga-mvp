import multer from "multer";
import { MAX_POST_UPLOAD, MAX_POST_UPLOAD_SIZE } from "../constants/constants.js";

export const upload = multer({
    dest: '../../temp/ngs-uploads',
    limits: {
        fileSize: MAX_POST_UPLOAD_SIZE,
        files: MAX_POST_UPLOAD
    },
    fileFilter: (req, files, callback) => {
        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ]

        if (!allowed.includes(files.mimetype)) {
            return callback(new Error("Unsupported media type"))
        }

        callback(null, true)
    }
})