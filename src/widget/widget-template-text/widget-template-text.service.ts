import { Injectable } from '@nestjs/common';
import { WidgetTemplateText } from './widget-template-text';
import { create } from 'lodash';

@Injectable()
export class WidgetTemplateTextService {
  createMany({ data }: { data: WidgetTemplateText[] }) {}
}
