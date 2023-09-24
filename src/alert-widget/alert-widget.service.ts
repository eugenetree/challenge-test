import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AlertWidgetRepository } from './alert-widget.repository';

@Injectable()
export class AlertWidgetService {
  constructor(
    private readonly alertWidgetsGroupRepository: AlertWidgetRepository,
  ) {}

  async create({ userId, name }: { userId: ID; name?: string }) {
    if (name) {
      return this.alertWidgetsGroupRepository.create({
        data: { name, userId },
      });
    }

    const groupsCount = await this.alertWidgetsGroupRepository.count({
      where: { userId },
    });

    return this.alertWidgetsGroupRepository.create({
      data: {
        name: `Віджет № ${groupsCount + 1}`,
        userId,
      },
    });
  }
}
