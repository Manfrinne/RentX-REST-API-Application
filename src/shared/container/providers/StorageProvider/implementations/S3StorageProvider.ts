import { S3 } from "aws-sdk";
import { resolve } from "path";
import fs from "fs";
import mime from "mime";

import upload from "@config/upload";
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    // apenas o PATH, representação do nome, do arquivo
    const originalName = resolve(upload.tmpFolder, file);
    // conteúdo do arquivo
    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    // Para inserir o objeto dentro do S3
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    // Quando inserido no S3, remover objeto do /tmp
    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
