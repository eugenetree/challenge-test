import { Injectable } from '@nestjs/common';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import { UiTextElement } from './ui-text-element';
import { UiTextElementMapper } from './ui-text-element.mapper';

@Injectable()
export class UiTextElementRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uiTextElementTransformer: UiTextElementMapper,
  ) {}

  async createMany({ data }: { data: OmitBaseModel<UiTextElement>[] }) {
    const createdTexts = await this.prisma.$transaction(async (prisma) => {
      return await Promise.all(
        data.map(async (entity) => {
          return await prisma.uiTextElement.create({
            data: this.uiTextElementTransformer.fromAppToDb(entity),
          });
        }),
      );
    });

    return createdTexts;
  }
}
