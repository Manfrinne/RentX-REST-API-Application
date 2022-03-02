import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // o "stat" verifica se um arquivo existe ou não
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  // Se o arquivo existir, o "unlink" apaga o arquivo do path
  await fs.promises.unlink(filename);
};
