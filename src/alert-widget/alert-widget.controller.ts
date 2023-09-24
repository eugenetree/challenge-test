import { Controller, Post, UseGuards } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { UserId } from 'src/auth/session/session.decorator';
import { AlertWidgetService } from './alert-widget.service';

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets-groups')
export class AlertWidgetController {
  constructor(private readonly alertWidgetsGroupService: AlertWidgetService) {}

  @Post()
  create(@UserId() userId: ID) {
    return this.alertWidgetsGroupService.create({ userId });
  }
}
