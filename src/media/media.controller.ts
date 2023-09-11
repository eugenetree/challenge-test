import { Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MediaService } from "./media.service";
import { UserId } from "src/auth/session/session.decorator";
import { ID } from "src/_common/types";
import { AuthSessionGuard } from "src/auth/auth-session.guard";

@Controller()
export class MediaController {
	constructor(
		private readonly mediaService: MediaService,
	) { }

	@Post('images')
	@UseInterceptors(FileInterceptor('image'))
	uploadImagePublic(
		@UploadedFile() image: Express.Multer.File,
	) {
		return this.mediaService.uploadImagePublic({
			binaryData: image.buffer,
			filename: image.originalname,
		});
	}

	@UseGuards(AuthSessionGuard)
	@Get('user/images')
	getImages(
		@UserId() userId: ID,
	) {
		return this.mediaService.getImages({ userId });
	}

	@UseGuards(AuthSessionGuard)
	@Post('user/images')
	@UseInterceptors(FileInterceptor('image'))
	uploadImagePrivate(
		@UploadedFile() image: Express.Multer.File,
		@UserId() userId: ID,
	) {
		return this.mediaService.uploadImagePrivate({
			binaryData: image.buffer,
			filename: image.originalname,
			userId,
		});
	}

	// @Post('audios')
	// @UseInterceptors(FileInterceptor('audio'))
	// uploadAudioPublic(
	// 	@UploadedFile('audio') file: Express.Multer.File,
	// ) {
	// 	return this.mediaService.uploadAudio({
	// 		binaryData: file.buffer,
	// 		filename: file.originalname,
	// 	});
	// }

	// @Post('user/audios')
	// uploadAudioPrivate(
	// 	@UploadedFile('audio') file: Express.Multer.File,
	// 	@UserId() userId: ID,
	// ) {
	// 	return this.mediaService.uploadAudio({
	// 		binaryData: file.buffer,
	// 		filename: file.originalname,
	// 		userId,
	// 	});
	// }
}