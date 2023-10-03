import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { DonationAlertTemplateService } from './donation-alert-template.service';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';

@UseGuards(AuthSessionGuard)
@Controller('donation-alert-widget-templates')
export class DonationAlertTemplateController {
  constructor(
    private readonly donationAlertTemplateService: DonationAlertTemplateService,
  ) {}

  @Get()
  async findTemplates(
    @Query('include') include: 'donation-alert' | 'nested',
    @Query('type') type: 'default',
    @UserId() userId: ID,
  ) {
    console.log(include, type, userId);

    if (include === 'donation-alert') {
      return this.donationAlertTemplateService.findManyWithDonationAlert({
        userId,
      });
    }

    if (include === 'nested') {
      return this.donationAlertTemplateService.findManyWithNested({ userId });
    }

    if (type === 'default') {
      return this.donationAlertTemplateService.getDefaultTemplates();
    }

    return this.donationAlertTemplateService.findMany({ userId });
  }
}
