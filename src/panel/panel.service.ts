import { Injectable } from "@nestjs/common";
import { ID } from "src/_common/types";
import { AlertWidgetsGroupRepository } from "src/alert-widgets-group/alert-widgets-group.repository";

@Injectable()
export class PanelService {
  constructor(
    private readonly alertWidgetsGroupRepository: AlertWidgetsGroupRepository,
  ) { }

  getAlertWidgetsPage({ userId }: { userId: ID }) {
    return this.alertWidgetsGroupRepository.findMany(({
      where: { userId },
      include: { donationAlertWidgets: true }
    }))
  }
}