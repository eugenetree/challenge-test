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
        {
          key: 'message',
          defaultValue:
            'Привіт брате, дякую тобі за поток, дійсно дуже круто. Продовжуй в тому ж дусі.',
        },
      ],
    };
  }
}
