import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { Image } from "./image";

@Injectable()
export class ImageRepository {
	constructor(private readonly prisma: PrismaService) { }

	create = async ({ data }: { data: Image }): Promise<Image> => {
		const createdImage = await this.prisma.image.create({ data });
		return new Image(createdImage);
	}

	findOne = async ({ where }: { where: Partial<Image> }): Promise<Image | null> => {
		const data = await this.prisma.image.findFirst({ where });
		return data ? new Image(data) : null;
	}

	findMany = async ({ where }: { where: Partial<Image> }): Promise<Image[]> => {
		const data = await this.prisma.image.findMany({ where });
		return data.map(data => new Image(data));
	}
};