// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { ID } from 'src/_common/types';
// import { UserId } from 'src/auth/session/session.decorator';
// import { PanelService } from './panel.service';
// import { AuthSessionGuard } from 'src/auth/auth-session.guard';

// @UseGuards(AuthSessionGuard)
// @Controller()
// export class PanelController {
//   constructor(private readonly panelService: PanelService) {}

//   @Get('alerts-page')
//   getAlertWidgetsPage(@UserId() userId: ID) {
//     return this.panelService.getAlertsPage({ userId });
//   }
// }
