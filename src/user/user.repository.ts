import { Injectable } from "@nestjs/common";
import { User } from "./user";
import { PrismaService } from "src/_common/database/prisma.service";
import { OauthProvider } from "src/oauth-provider/oauth-provider";
import { Optional } from "src/_common/types";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) { }

	create = async ({ data }: { data: Optional<User, 'id' | 'email' | 'username'> }): Promise<User> => {
		return this.prisma.user.create({ data });
	}

	findOne = async ({ where }: { where: Partial<User> }): Promise<User | null> => {
		return this.prisma.user.findFirst({ where });
	}

	findOneByOauthProvider =
		async ({ where }: { where: Partial<OauthProvider> }): Promise<User | null> => {
			return this.prisma.user.findFirst({
				where: { ouathProviders: { some: where } }
			})
		};
};