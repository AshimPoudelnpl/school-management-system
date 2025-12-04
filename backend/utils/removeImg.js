import fs from "fs"

export const removeImage = (path) => {
  if (req.file) {
    fs.unlinkSync(path);
  }
};