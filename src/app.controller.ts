import { Controller, Get, Req } from '@nestjs/common';
import { AlertWidgetRepository } from './alert-widget/alert-widget.repository';

@Controller()
export class AppController {
  constructor(
    private readonly alertWidgetsGroupRepository: AlertWidgetRepository,
  ) {}

  @Get('ping')
  async pingGet() {
    return 'pong';
  }

  @Get('test')
  test() {
    return this.alertWidgetsGroupRepository.findMany({
      where: { userId: '80012aa2-afbd-45d2-8917-2dd8a290a5a5' },
      include: { donationAlerts: true },
    });
  }
}
