import { Module } from "@nestjs/common";
import { AlertWidgetsGroupService } from "./alert-widgets-group.service";
import { DatabaseModule } from "src/_common/database/database.module";
import { AlertWidgetsGroupRepository } from "./alert-widgets-group.repository";

@Module({
  imports: [DatabaseModule],
  providers: [AlertWidgetsGroupService, AlertWidgetsGroupRepository],
  exports: [AlertWidgetsGroupService],
	controllers: [],
})
export class AlertWidgetsGroupModule { }
