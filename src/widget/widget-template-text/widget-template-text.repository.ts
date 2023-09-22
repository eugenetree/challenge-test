import { Injectable } from '@nestjs/common';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import { WidgetTemplateText } from './widget-template-text';
import { WidgetTemplateText as PrismaWidgetTemplateText } from '@prisma/client';
import { WidgetTemplateTextTransformer } from './widget-template-text.transformer';

@Injectable()
export class WidgetTemplateTextRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly widgetTemplateTextTransformer: WidgetTemplateTextTransformer,
  ) {}

  async createMany({ data }: { data: OmitBaseModel<WidgetTemplateText>[] }) {
    const createdTexts = await this.prisma.$transaction(async (prisma) => {
      return await Promise.all(
        data.map(async (entity) => {
          return await prisma.widgetTemplateText.create({
            data: this.widgetTemplateTextTransformer.transformFromAppToDbFormat(
              entity,
            ),
          });
        }),
      );
    });

    return createdTexts;
  }
}
