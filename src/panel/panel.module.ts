import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { AlertWidgetsGroupModule } from 'src/alert-widgets-group/alert-widgets-group.module';
import { SessionModule } from 'src/auth/session/session.module';
import { DatabaseModule } from 'src/_common/database/database.module';
import { PanelRepository } from './panel.repository';
import { WidgetTemplateTextModule } from 'src/widget/widget-template-text/widget-template-text.module';

@Module({
  imports: [
    AlertWidgetsGroupModule,
    SessionModule,
    DatabaseModule,
    WidgetTemplateTextModule,
  ],
  providers: [PanelService, PanelRepository],
  exports: [PanelService],
  controllers: [PanelController],
})
export class PanelModule {}
