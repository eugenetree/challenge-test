import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DonationNotifierService } from "./donation-notifier/donation-notifier.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStorageService } from "./_common/file-storage/file-storage.service";
import { extname } from "path";
import { UserMediaService } from "./user-media/user-media.service";

@Controller()
export class AppController {
	constructor(
		private readonly userMediaService: UserMediaService,
	) { }
}