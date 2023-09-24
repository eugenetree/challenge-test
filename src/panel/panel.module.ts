import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { AlertWidgetModule } from 'src/alert-widget/alert-widget.module';
import { SessionModule } from 'src/auth/session/session.module';
import { DatabaseModule } from 'src/_common/database/database.module';
import { PanelRepository } from './panel.repository';
import { WidgetTemplateTextModule } from 'src/widget/widget-template-text/widget-template-text.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AlertWidgetModule,
    SessionModule,
    DatabaseModule,
    WidgetTemplateTextModule,
  ],
  providers: [PanelService, PanelRepository],
  exports: [PanelService],
  controllers: [PanelController],
})
export class PanelModule {}
