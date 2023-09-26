import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DonationAlertService } from './donation-alert.service';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets/:alertWidgetId/alerts')
export class DonationAlertController {
  constructor(private readonly donationAlertService: DonationAlertService) {}

  @Post()
  create(@Param('alertWidgetId') alertWidgetId: string, @UserId() userId: ID) {
    return this.donationAlertService.create({
      alertWidgetId,
      userId,
    });
  }
}
