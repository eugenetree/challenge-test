import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AlertWidgetRepository } from './alert-widget.repository';

@Injectable()
export class AlertWidgetService {
  constructor(private readonly alertWidgetRepository: AlertWidgetRepository) {}

  async create({ userId, name }: { userId: ID; name?: string }) {
    if (name) {
      return this.alertWidgetRepository.create({
        data: { name, userId },
      });
    }

    const groupsCount = await this.alertWidgetRepository.count({
      where: { userId },
    });

    return this.alertWidgetRepository.create({
      data: {
        name: `Віджет № ${groupsCount + 1}`,
        userId,
      },
    });
  }
}
