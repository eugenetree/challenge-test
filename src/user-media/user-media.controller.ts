import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserMediaService } from "./user-media.service";
import { UserId } from "src/auth/session/session.decorator";
import { ID } from "src/_common/types";
import { AuthSessionGuard } from "src/auth/auth-session.guard";

@UseGuards(AuthSessionGuard)
@Controller('user/media')
export class UserMediaController {
	constructor(
		private readonly userMediaService: UserMediaService,
	) { }

	@UseInterceptors(FileInterceptor('file'))
	@Post()
	upload(
		@UserId() userId: ID,
		@UploadedFile('file') file: Express.Multer.File,
	) {
		console.log('working', userId, file.filename)
		console.log('eugenge', userId);
		return this.userMediaService.uploadFile({
			binaryData: file.buffer,
			filename: file.originalname,
			userId,
		});
	}
}