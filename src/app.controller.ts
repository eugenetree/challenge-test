import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DonationNotifierService } from "./donation-notifier/donation-notifier.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStorageService } from "./_common/file-storage/file-storage.service";
import { extname } from "path";

@Controller()
export class AppController {
	constructor(
		private readonly donationNotifierService: DonationNotifierService,
		private readonly fileStorageService: FileStorageService,
	) { }

	@UseInterceptors(FileInterceptor('file'))
  @Post('file')
  async uploadFile(
    @UploadedFile('file') file: Express.Multer.File,
  ) {
		console.log(file);
		const path = await this.fileStorageService.saveFile({
			file: file.buffer,
			extension: extname(file.originalname),
		});

		return path;
  }
}