import { Injectable } from '@nestjs/common';
import { WidgetTemplateText as PrismaWidgetTemplateText } from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { WidgetTemplateText } from './widget-template-text';

@Injectable()
export class WidgetTemplateTextTransformer {
  transformFromAppToDbFormat(
    entity: OmitBaseModel<WidgetTemplateText>,
  ): OmitBaseModel<PrismaWidgetTemplateText> {
    return {
      ...entity,
      styleConfig: JSON.stringify(entity.styleConfig),
      animationConfig: JSON.stringify(entity.animationConfig),
      positionConfig: JSON.stringify(entity.positionConfig),
    };
  }

  transformFromDbToAppFormat(
    entity: PrismaWidgetTemplateText,
  ): WidgetTemplateText {
    console.log('transfomring', entity);

    return {
      ...entity,
      styleConfig: JSON.parse(entity.styleConfig),
      animationConfig: JSON.parse(entity.animationConfig),
      positionConfig: JSON.parse(entity.positionConfig),
    };
  }
}
