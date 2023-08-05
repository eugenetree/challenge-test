import { Injectable } from "@nestjs/common";
import { writeFile } from 'fs/promises';
import * as crypto from "crypto";
import * as path from "path";
import { path as appRootPath } from 'app-root-path';
import { SettingsService } from "../settings/settings.service";

@Injectable()
export class FileStorageService {
	constructor(
		private readonly settingsService: SettingsService,
	) { }

	saveFile = async ({ binaryData, filename, folder }: { binaryData: Buffer, filename: string, folder?: string }) => {
		const filePath = path.join(appRootPath, 'storage', `${crypto.randomUUID()}-${filename}`);
		await writeFile(filePath, binaryData);
		
		return path.join(this.settingsService.BACK_APP_URL, filePath);
	}
}