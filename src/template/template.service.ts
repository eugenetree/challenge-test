import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
  getTemplateVariables() {
    return {
      donationAlert: [
        {
          key: 'amount',
          defaultValue: '100',
        },
        {
          key: 'currency',
          defaultValue: 'uah',
        },
        {
          key: 'name',
          defaultValue: 'Патрік',
        },
      ],
    };
  }
}
