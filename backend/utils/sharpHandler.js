import sharp from "sharp";
import { removeImage } from "./removeImg.js ";

export const compressImg = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
    removeImage(inputPath);
  } catch (error) {
    console.log(error);
  }
};
