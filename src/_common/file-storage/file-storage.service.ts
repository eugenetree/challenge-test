import { Injectable } from "@nestjs/common";
import { writeFile } from 'fs/promises';
import * as crypto from "crypto";
import * as path from "path";
import {path as appRootPath} from 'app-root-path';

@Injectable()
export class FileStorageService {
	saveFile = async ({ file, extension, folder }: { file: Buffer, extension: string, folder?: string }) => {
		const filePath = path.resolve(appRootPath, 'storage', `${crypto.randomUUID()}${extension}`);
		await writeFile(filePath, file);
		return filePath;
	}
}