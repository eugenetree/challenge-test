import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/_common/database/database.module";
import { AlertWidgetsGroupRepository } from "./alert-widgets-group.repository";

@Module({
  imports: [DatabaseModule],
  providers: [AlertWidgetsGroupRepository],
  exports: [AlertWidgetsGroupRepository],
	controllers: [],
})
export class AlertWidgetsGroupModule { }
