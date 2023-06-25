import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { OauthProvider } from "./oauth-provider";

@Injectable()
export class OauthProviderRepository {
	constructor(private readonly prisma: PrismaService) { }

	create = async ({ data }: { data: OauthProvider }): Promise<OauthProvider> => {
		const createdOauthProvider = await this.prisma.oauthProvider.create({ data });
		return new OauthProvider(createdOauthProvider);
	}

	findOne = async ({ where }: { where: Partial<OauthProvider> }): Promise<OauthProvider | null> => {
		const data = await this.prisma.oauthProvider.findFirst({ where });
		return data ? new OauthProvider(data) : null;
	}
};