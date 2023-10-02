import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { UserId } from 'src/auth/session/session.decorator';
import { AlertWidgetService } from './alert-widget.service';

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets')
export class AlertWidgetController {
  constructor(private readonly alertWidgetService: AlertWidgetService) {}

  @Get()
  async findMany(
    @Query('with-relations') withRelations: boolean,
    @UserId() userId: ID,
  ) {
    if (withRelations) {
      return this.alertWidgetService.findManyWithRelations({ userId });
    }

    return this.alertWidgetService.findMany({ userId });
  }

  @Post()
  create(@UserId() userId: ID) {
    return this.alertWidgetService.create({ userId });
  }

  @Delete(':widgetId')
  delete(@UserId() userId: ID) {
    return;
  }
}
