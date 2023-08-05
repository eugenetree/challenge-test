import { Injectable } from "@nestjs/common";
import { FileStorageService } from "src/_common/file-storage/file-storage.service";
import { ID } from "src/_common/types";
import { UserMediaRepository } from "./user-media.repository";
import { UserMedia } from "./user-media";

@Injectable()
export class UserMediaService {
	constructor(
		private readonly fileStorageService: FileStorageService,
		private readonly userMediaRepository: UserMediaRepository,
	) { }

	private readonly allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']
	
	uploadFile = async ({
		userId, 
		binaryData,
		filename,
	 }: {
		userId: ID,
		binaryData: Buffer;
		filename: string;
	}) => {
		const extension = this.getExtensionFromFilename(filename);

		if (!extension) {
			throw new Error('Filename should contain extension');
		}

		if (!this.allowedExtensions.includes(extension)) {
			throw new Error('File extension is not allowed');
		}

		const fileUrl = await this.fileStorageService.saveFile({ 
			binaryData,
			filename,
			folder: `users/${userId}`,
		 });

     this.userMediaRepository.create({
			data: new UserMedia({
				name: filename,
				userId,
			}),
		 });

		 return fileUrl;
	}

	private getExtensionFromFilename = (filename: string): string | undefined => {
		return filename.split('.').at(-1);
	}
}