import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { OauthProviderRepository } from "../domain/oauth-provider.repository.type";
import { OauthProvider } from "../domain/oauth-provider";

@Injectable()
export class BaseOauthProviderRepository implements OauthProviderRepository {
	constructor(private readonly prisma: PrismaService) { }

	create: OauthProviderRepository['create'] = async ({ data }) => {
		const createdOauthProvider = await this.prisma.oauthProvider.create({ data });
		return new OauthProvider(createdOauthProvider);
	}

	findOne: OauthProviderRepository['findOne'] = async ({ where }) => {
		const data = await this.prisma.oauthProvider.findFirst({ where });
		return data ? new OauthProvider(data) : null;
	}
};