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
import { DonationAlert } from './donation-alert.types';
import { CreateDonationAlertDto } from './donation-alert.dto';

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets/:alert-widget-id/donation-alerts')
export class DonationAlertController {
  constructor(private readonly donationAlertService: DonationAlertService) {}

  @Post()
  create(
    @Param('alertWidgetId') alertWidgetId: string,
    @UserId() userId: ID,
    @Body() dto: CreateDonationAlertDto,
  ): Promise<DonationAlert> {
    return this.donationAlertService.createWithCustomTemplate({
      ...dto,
      alertWidgetId,
      userId,
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
