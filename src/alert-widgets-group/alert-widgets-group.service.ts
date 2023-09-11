import { Injectable } from "@nestjs/common";
import { ID } from "src/_common/types";
import { AlertWidgetsGroupRepository } from "./alert-widgets-group.repository";

@Injectable()
export class AlertWidgetsGroupService {
  constructor(
    private readonly alertWidgetsGroupRepository: AlertWidgetsGroupRepository,
  ) { }

  create(data: { userId: ID }) {
    return this.alertWidgetsGroupRepository.create({ data });
  }
}