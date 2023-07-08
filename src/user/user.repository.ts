import { Injectable } from "@nestjs/common";
import { User } from "./user";
import { PrismaService } from "src/_common/database/prisma.service";
import { OauthProvider } from "src/oauth-provider/oauth-provider";
import { AlertWidgetsGroup } from "src/alert-widgets-group/alert-widgets-group";
import { DonationAlertWidget } from "src/donation-alert-widget/donation-alert-widget";

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

	create = async ({ data }: { data: User }): Promise<User> => {
		return new User(await this.prisma.user.create({ data }));
	}

	createUserViaOauthWithDefaults = async ({ data: {
		user,
		oauthProvider,
		alertWidgetsGroup,
		donationAlertWidget,
	} }: {
		data: {
			user: User,
			oauthProvider: OauthProvider,
			alertWidgetsGroup: AlertWidgetsGroup,
			donationAlertWidget: DonationAlertWidget,
		}
	}) => {
		return new User(await this.prisma.user.create({
			data: {
				...user,
				ouathProviders: { create: oauthProvider },
				alertWidgetsGroups: {
					create: {
						...alertWidgetsGroup,
						donationAlertWidgets: { create: donationAlertWidget }
					}
				},
			}
		}))
	}

	createWithOauthProvider =
		async ({ data }: { data: { user: User, oauthProvider: OauthProvider } }): Promise<User> => {
			const { user, oauthProvider } = data;

			const createdUser = await this.prisma.user.create({
				data: {
					...user,
					ouathProviders: { create: oauthProvider },
				}
			})

			return new User(createdUser);
		};
};