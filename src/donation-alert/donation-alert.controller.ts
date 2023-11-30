import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DonationAlertService } from './donation-alert.service';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';
import { DonationAlert, DonationAlertWithTemplate } from './donation-alert.types';
import { CreateDonationAlertDto } from './donation-alert.dto';

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets/:alertWidgetId/donation-alerts')
export class DonationAlertController {
  constructor(private readonly donationAlertService: DonationAlertService) {}

  @Post()
  create(
    @Param('alertWidgetId') alertWidgetId: string,
    @UserId() userId: ID,
    @Body() dto: CreateDonationAlertDto,
  ): Promise<DonationAlertWithTemplate> {
    return this.donationAlertService.createWithCustomTemplate({
      alert: {
        ...dto.alert,
        userId,
        alertWidgetId,
      },
      template: dto.template,
    });
  }

  @Get(':alert-id')
  findOne(
    @Param('alert-id') alertId: string,
    @Param('alert-widget-id') alertWidgetId,
    @Query('include') include: 'template',
    @UserId() userId: ID,
  ) {
    if (include === 'template') {
      return this.donationAlertService.findOneWithTemplate({
        alertId,
        alertWidgetId,
        userId,
      });
    }

    return this.donationAlertService.findOne({
      alertWidgetId,
      alertId,
      userId,
    });
  }
}
