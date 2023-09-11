import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { AlertWidgetsGroup } from "./alert-widgets-group";
import { Optional } from "src/_common/types";

@Injectable()
export class AlertWidgetsGroupRepository {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	create = async ({ data }: { data: Optional<AlertWidgetsGroup, 'id'> }): Promise<AlertWidgetsGroup> => {
		return this.prisma.alertWidgetsGroup.create({ data });
	}

	findMany = async ({ where, include }: { where: Partial<AlertWidgetsGroup>; include?: { donationAlertWidgets?: boolean } }): Promise<AlertWidgetsGroup[]> => {
		return this.prisma.alertWidgetsGroup.findMany({ where, include });
	}
}