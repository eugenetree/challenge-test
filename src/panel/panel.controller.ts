import { Controller, Get } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { UserId } from 'src/auth/session/session.decorator';
import { PanelService } from './panel.service';

@Controller()
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Get('alerts-page')
  getAlertWidgetsPage(@UserId() userId: ID) {
    return this.panelService.getAlertsPage({ userId });
  }
}
