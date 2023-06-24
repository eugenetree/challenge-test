import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository.type";
import { User } from "../domain/user";
import { PrismaService } from "src/_common/database/prisma.service";
import { omit } from "lodash";

@Injectable()
export class BaseUserRepository implements UserRepository {
	constructor(private readonly prisma: PrismaService) { }

	findOne: UserRepository['findOne'] = async ({ where }) => {
		const userData = await this.prisma.user.findFirst({ where });
		return userData ? new User(userData) : null;
	}

	findOneByOauthProvider: UserRepository['findOneByOauthProvider'] = async ({ where }) => {
		const userData = await this.prisma.user.findFirst({
			where: { ouathProviders: { some: where } }
		})

		return userData ? new User(userData) : null;
	};

	createWithOauthProvider: UserRepository['createWithOauthProvider'] = async ({ data }) => {
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