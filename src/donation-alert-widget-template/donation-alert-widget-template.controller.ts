import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { DonationAlertWidgetTemplateService } from './donation-alert-widget-template.service';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';

@UseGuards(AuthSessionGuard)
@Controller('donation-alert-widget-templates')
export class DonationAlertWidgetTemplateController {
  constructor(
    private readonly donationAlertWidgetTemplateService: DonationAlertWidgetTemplateService,
  ) {}

  @Get()
  async getTemplates(@UserId() userId: ID) {
    return this.donationAlertWidgetTemplateService.getTemplates({ userId });
  }
}
