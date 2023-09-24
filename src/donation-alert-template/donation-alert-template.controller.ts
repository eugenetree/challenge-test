import { Controller, Get, UseGuards } from '@nestjs/common';
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
  async getTemplates(@UserId() userId: ID) {
    return this.donationAlertTemplateService.getTemplates({ userId });
  }
}
