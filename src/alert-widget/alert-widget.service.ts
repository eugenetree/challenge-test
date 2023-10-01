import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AlertWidgetRepository } from './alert-widget.repository';
import { PrismaService } from 'src/_common/database/prisma.service';
import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';
import { AlertWidgetWithRelations } from './alert-widget';
import { AlertWidget } from '@prisma/client';

@Injectable()
export class AlertWidgetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly alertWidgetRepository: AlertWidgetRepository,
    private readonly uiTextElementTransformer: UiTextElementMapper,
  ) {}

  async create({
    userId,
    name,
  }: {
    userId: ID;
    name?: string;
  }): Promise<AlertWidgetWithRelations> {
    if (name) {
      return this.alertWidgetRepository.create({
        data: { name, userId, isEnabled: true },
      });
    }

    const groupsCount = await this.alertWidgetRepository.count({
      where: { userId },
    });

    console.log('creating widget');

    return this.alertWidgetRepository.create({
      data: {
        name: `Віджет № ${groupsCount + 1}`,
        userId,
        isEnabled: true,
      },
    });
  }

  async findAll({
    userId,
  }: {
    userId: ID;
  }): Promise<AlertWidgetWithRelations[]> {
    return this.alertWidgetRepository.findMany({
      where: { userId },
    });
  }
}
