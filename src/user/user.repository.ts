import { Injectable } from "@nestjs/common";
import { User } from "./user";
import { PrismaService } from "src/_common/database/prisma.service";
import { omit } from "lodash";
import { OauthProvider } from "src/oauth-provider/oauth-provider";
import { ID } from "src/_common/types";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) { }

	findOne = async ({ where }: { where: Partial<User> }): Promise<User | null> => {
		const userData = await this.prisma.user.findFirst({ where });
		return userData ? new User(userData) : null;
	}

	findOneByOauthProvider =
		async ({ where }: { where: Partial<OauthProvider> }): Promise<User | null> => {
			const userData = await this.prisma.user.findFirst({
				where: { ouathProviders: { some: where } }
			})

			return userData ? new User(userData) : null;
		};

	createWithOauthProvider =
		async ({ data }: { data: { user: User, oauthProvider: OauthProvider } }): Promise<User> => {
			const { user, oauthProvider } = data;

			const createdUser = await this.prisma.user.create({
				data: {
					...user,
					ouathProviders: { create: omit(oauthProvider, ['userId']) },
				}
			})

			return new User(createdUser);
		};
};