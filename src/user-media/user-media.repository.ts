import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { UserMedia } from "./user-media";

@Injectable()
export class UserMediaRepository {
	constructor(private readonly prisma: PrismaService) { }

	create = async ({ data }: { data: UserMedia }): Promise<UserMedia> => {
		const createdUserMedia = await this.prisma.userMedia.create({
			data: {
				...data,
				donationAlertWidgetId: data.donationAlertWidgetId || undefined
			}
		});
		return new UserMedia(createdUserMedia);
	}

	findOne = async ({ where }: { where: Partial<UserMedia> }): Promise<UserMedia | null> => {
		const data = await this.prisma.userMedia.findFirst({ where });
		return data ? new UserMedia(data) : null;
	}
};