import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { AlertWidgetsGroupModule } from 'src/alert-widgets-group/alert-widgets-group.module';
import { SessionModule } from 'src/auth/session/session.module';
import { DatabaseModule } from 'src/_common/database/database.module';
import { PanelRepository } from './panel.repository';

@Module({
  imports: [AlertWidgetsGroupModule, SessionModule, DatabaseModule],
  providers: [PanelService, PanelRepository],
  exports: [PanelService],
  controllers: [PanelController],
})
export class PanelModule {}
