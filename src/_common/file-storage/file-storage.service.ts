import { Injectable } from "@nestjs/common";
import { mkdir, writeFile } from 'fs/promises';
import * as crypto from "crypto";
import * as path from "path";
import { existsSync } from "fs";
import { SettingsService } from "../settings/settings.service";

@Injectable()
export class FileStorageService {
	constructor(
		private readonly settingsService: SettingsService,
	) { }

	getRootStoragePath = () => {
		return this.settingsService.BACK_APP_URL;
	}

	saveFile = async ({
		binaryData,
		filename: originalFilename,
		folder = '',
	}: { binaryData: Buffer, filename: string, folder?: string }) => {
		if (!existsSync(folder)) {
			await mkdir(folder, { recursive: true });
		}

		const extension = originalFilename.split('.').at(-1);
		const filenameWithoutExtension = originalFilename.split('.').slice(0, -1).join('.');
		const saltedFilename = `${filenameWithoutExtension}-${crypto.randomUUID()}.${extension}`;

		const filePath = path.join(folder, saltedFilename);
		await writeFile(filePath, binaryData);

		return {
			folder: folder,
			filename: saltedFilename,
		}
	}
}