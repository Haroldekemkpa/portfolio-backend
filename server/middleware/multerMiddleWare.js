import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Hadle __dirname Modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `HP${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".webp"];

  const fileExt = path.extname(file.originalname).toLowerCase();
  const isMimeAllowed = allowedMimeTypes.includes(file.mimetype);
  const isExtAllowed = allowedExtensions.includes(fileExt);

  if (isMimeAllowed && isExtAllowed) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Error: file upload only supports jpeg, jpg, png, and webp formats"
    )
  );
};

const upload = multer({ storage, fileFilter });

export const uploadFile = upload.single("file");
