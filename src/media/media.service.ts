import { Injectable } from "@nestjs/common";
import { FileStorageService } from "src/_common/file-storage/file-storage.service";
import { ID } from "src/_common/types";
import { ImageRepository } from "./image.repository";
import { Image } from "./image";
import * as path from "path";

type FileType = 'publicImage' | 'publicAudio' | 'privateImage' | 'privateAudio';

@Injectable()
export class MediaService {
	constructor(
		private readonly fileStorageService: FileStorageService,
		private readonly imageRepository: ImageRepository,
	) { }

	private readonly allowedExtensions = {
		image: ['png', 'jpg', 'jpeg', 'gif'],
		audio: ['mp3', 'wav', 'ogg'],
	}

	async getImages({ userId }: { userId: ID }) {
		const images = await this.imageRepository.findMany({ where: { userId } });
		return images.map((image) => ({
			id: image.id,
			name: image.originalFilename,
			url: path.join(
				this.fileStorageService.getRootStoragePath(),
				this.getFolderName({ fileType: 'privateImage', userId }),
				image.generatedFilename,
			),
		}))
	}

	async uploadImagePublic({
		binaryData,
		filename: originalFilename,
	}: {
		binaryData: Buffer;
		filename: string;
	}) {
		this.validateImage({ filename: originalFilename });

		const folder = this.getFolderName({ fileType: 'publicImage' });

		const { filename: generatedFilename } = await this.fileStorageService.saveFile({
			binaryData,
			filename: originalFilename,
			folder,
		});

		const createdImageRecord = await this.imageRepository.create({
			data: {
				originalFilename,
				generatedFilename
			},
		});

		return {
			id: createdImageRecord.id,
			name: originalFilename,
			url: path.join(
				this.fileStorageService.getRootStoragePath(),
				folder,
				generatedFilename,
			),
		}
	}

	async uploadImagePrivate({
		binaryData,
		filename: originalFilename,
		userId,
	}: {
		binaryData: Buffer;
		filename: string;
		userId: ID;
	}) {
		this.validateImage({ filename: originalFilename });

		const folder = this.getFolderName({ fileType: 'privateImage', userId });

		const { filename: generatedFilename } = await this.fileStorageService.saveFile({
			binaryData,
			filename: originalFilename,
			folder,
		});

		const createdImageRecord = await this.imageRepository.create({
			data: {
				originalFilename,
				generatedFilename,
				userId,
			},
		});

		return {
			id: createdImageRecord.id,
			name: originalFilename,
			url: path.join(
				this.fileStorageService.getRootStoragePath(),
				folder,
				generatedFilename,
			),
		}
	}

	async findAllImages({ userId }: { userId: ID }) {
		return this.imageRepository.findMany({ where: { userId } });
	}

	private validateImage({ filename }: { filename: string }) {
		const extension = this.getExtensionFromFilename(filename);

		if (!extension) {
			throw new Error('Image filename should contain extension');
		}

		if (!this.allowedExtensions.image.includes(extension)) {
			throw new Error('Image extension is not allowed');
		}
	}

	private validateAudio({ filename }: { filename: string }) {
		const extension = this.getExtensionFromFilename(filename);

		if (!extension) {
			throw new Error('Audio filename should contain extension');
		}

		if (!this.allowedExtensions.image.includes(extension)) {
			throw new Error('Audio extension is not allowed');
		}
	}

	private getExtensionFromFilename = (filename: string): string | undefined => {
		return filename.split('.').at(-1);
	}

	private getFolderName(params:
		{ fileType: Extract<FileType, 'publicImage' | 'publicAudio'> } |
		{ fileType: Extract<FileType, 'privateImage' | 'privateAudio'>; userId: ID }
	): string {
		const fileType = params.fileType;

		if (fileType === 'publicImage') { return 'storage/images/public' };
		if (fileType === 'publicAudio') { return 'storage/audios/public' };

		if (fileType === 'privateImage') { return `storage/images/private/${params.userId}` };
		if (fileType === 'privateAudio') { return `storage/audios/private/${params.userId}` };

		throw new Error('Unknown file type');
	}
}