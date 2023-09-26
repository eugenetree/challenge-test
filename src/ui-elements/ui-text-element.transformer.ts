import { Injectable } from '@nestjs/common';
import { UiTextElement as PrismaUiTextElement } from '@prisma/client';
import { OmitBaseModel } from 'src/_common/database/database.types';
import { UiTextElement } from './ui-text-element';

@Injectable()
export class UiTextElementTransformer {
  transformFromAppToDbFormat(
    entity: OmitBaseModel<UiTextElement>,
  ): OmitBaseModel<PrismaUiTextElement> {
    return {
      ...entity,
      styleConfig: JSON.stringify(entity.styleConfig),
      animationConfig: JSON.stringify(entity.animationConfig),
      positionConfig: JSON.stringify(entity.positionConfig),
    };
  }

  transformFromDbToAppFormat(entity: PrismaUiTextElement): UiTextElement {
    return {
      ...entity,
      styleConfig: JSON.parse(entity.styleConfig),
      animationConfig: JSON.parse(entity.animationConfig),
      positionConfig: JSON.parse(entity.positionConfig),
    };
  }
}
