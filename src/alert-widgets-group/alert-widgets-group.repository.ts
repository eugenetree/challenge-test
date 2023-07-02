import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/_common/database/prisma.service";
import { AlertWidgetsGroup } from "./alert-widgets-group";

@Injectable()
export class AlertWidgetsGroupRepository {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	create = async ({ data }: { data: AlertWidgetsGroup }): Promise<AlertWidgetsGroup> => {
		return new AlertWidgetsGroup(
			await this.prisma.alertWidgetsGroup.create({ data }));
	}

	findMany = async ({ where }: { where: Partial<AlertWidgetsGroup> }): Promise<AlertWidgetsGroup[]> => {
		return (await this.prisma.alertWidgetsGroup.findMany({ where }))
			.map(data => new AlertWidgetsGroup(data));
	}
}