import { Controller, Get, Req } from '@nestjs/common';
import { AlertWidgetRepository } from './alert-widget/alert-widget.repository';

@Controller()
export class AppController {
  constructor(private readonly alertWidgetRepository: AlertWidgetRepository) {}

  @Get('ping')
  async pingGet() {
    return 'pong';
  }

  @Get('test')
  test() {
    return this.alertWidgetRepository.findMany({
      where: { userId: '80012aa2-afbd-45d2-8917-2dd8a290a5a5' },
      include: { donationAlerts: true },
    });
  }
}
