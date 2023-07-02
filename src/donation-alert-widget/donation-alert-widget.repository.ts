import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { DonationAlertWidget } from "./donation-alert-widget";
import { ID } from "src/_common/types";

@Injectable()
export class DonationAlertWidgetRepository {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	create = async ({ data }: { data: DonationAlertWidget }): Promise<DonationAlertWidget> => {
		return new DonationAlertWidget(
			await this.prisma.donationAlertWidget.create({ data }));
	}

	findManyByAlertWidgetsGroupIds = async (ids: ID[]): Promise<DonationAlertWidget[]> => {
		return (await this.prisma.donationAlertWidget.findMany({
			where: { alertWidgetsGroupId: { in: ids } }, 
		})).map(data => new DonationAlertWidget(data));
	}
}