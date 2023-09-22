import { Injectable } from '@nestjs/common';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { PrismaService } from 'src/_common/database/prisma.service';
import { WidgetTemplateText } from './widget-template-text';
import { WidgetTemplateText as PrismaWidgetTemplateText } from '@prisma/client';

@Injectable()
export class WidgetTemplateTextRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany({ data }: { data: OmitBaseModel<WidgetTemplateText>[] }) {
    const createdTexts = await this.prisma.$transaction(async (prisma) => {
      return await Promise.all(
        data.map(async (entity) => {
          return await prisma.widgetTemplateText.create({
            data: this.transformEntityToDbFormat(entity),
          });
        }),
      );
    });

    return createdTexts;
  }

  private transformEntityToDbFormat(
    entity: OmitBaseModel<WidgetTemplateText>,
  ): OmitBaseModel<PrismaWidgetTemplateText> {
    return {
      ...entity,
      styleConfig: JSON.stringify(entity.styleConfig),
      animationConfig: JSON.stringify(entity.animationConfig),
      positionConfig: JSON.stringify(entity.positionConfig),
    };
  }

  // private transformEntityToAppFormat(
  //   entity: PrismaWidgetTemplateText,
  // ): WidgetTemplateText {
  //   return {
  //     ...entity,
  //     styleConfig: JSON.parse(entity.styleConfig),
  //     animationConfig: JSON.parse(entity.animationConfig),
  //     positionConfig: JSON.parse(entity.positionConfig),
  //   };
  // }
}
