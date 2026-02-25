import multer from 'multer';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});
