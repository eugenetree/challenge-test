import { Injectable } from '@nestjs/common';
import { UiTextElement } from './ui-text-element';
import { create } from 'lodash';

@Injectable()
export class UiTextElementService {
  createMany({ data }: { data: UiTextElement[] }) {}
}
