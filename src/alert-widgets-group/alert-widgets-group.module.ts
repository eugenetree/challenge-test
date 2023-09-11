import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/_common/database/database.module";
import { AlertWidgetsGroupRepository } from "./alert-widgets-group.repository";
import { AlertWidgetsGroupService } from "./alert-widgets-group.service";
import { AlertWidgetsGroupController } from "./alert-widgets-group.controller";
import { SessionModule } from "src/auth/session/session.module";

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [AlertWidgetsGroupRepository, AlertWidgetsGroupService],
  exports: [AlertWidgetsGroupRepository, AlertWidgetsGroupService],
	controllers: [AlertWidgetsGroupController],
})
export class AlertWidgetsGroupModule { }
