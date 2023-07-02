import { Injectable } from "@nestjs/common";
import { AlertWidgetsGroupRepository } from "./alert-widgets-group.repository";
import { AlertWidgetsGroup, AlertWidgetsGroupInputParams } from "./alert-widgets-group";

@Injectable()
export class AlertWidgetsGroupService {
	constructor(
		private readonly alertWidgetsGroupRepository: AlertWidgetsGroupRepository,
	) { }

	create = async ({ data }: { data: AlertWidgetsGroupInputParams }): Promise<AlertWidgetsGroup> => {
		return this.alertWidgetsGroupRepository.create({
			data: new AlertWidgetsGroup(data)
		});
	}

	findMany = async ({ where }: { where: Partial<AlertWidgetsGroup> }): Promise<AlertWidgetsGroup[]> => {
		return this.alertWidgetsGroupRepository.findMany({ where });
	}
}