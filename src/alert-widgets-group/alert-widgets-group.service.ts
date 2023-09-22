import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AlertWidgetsGroupRepository } from './alert-widgets-group.repository';

@Injectable()
export class AlertWidgetsGroupService {
  constructor(
    private readonly alertWidgetsGroupRepository: AlertWidgetsGroupRepository,
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
        name: `Група № ${groupsCount + 1}`,
        userId,
      },
    });
  }
}
