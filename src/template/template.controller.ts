import { Controller, Get, Param } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('template-variables')
  getTemplateVariables() {
    return this.templateService.getTemplateVariables();
  }
}
