import fs from "fs";

export const deleteFile = async (filename, path) => {
  try {
    console.log(filename, path, "--from delete file");
    if (filename && fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
