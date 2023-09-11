import { Module } from "@nestjs/common";
import { PanelService } from "./panel.service";
import { PanelController } from "./panel.controller";
import { AlertWidgetsGroupModule } from "src/alert-widgets-group/alert-widgets-group.module";
import { SessionModule } from "src/auth/session/session.module";

@Module({
  imports: [AlertWidgetsGroupModule, SessionModule],
  providers: [PanelService],
  exports: [PanelService],
  controllers: [PanelController],
})
export class PanelModule {}