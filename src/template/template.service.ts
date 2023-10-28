import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
  getTemplateVariables() {
    return {
      donationAlert: [
        {
          key: 'amount',
          value: '100',
        },
        {
          key: 'currency',
          value: 'uah',
        },
        {
          key: 'name',
          value: 'Патрік',
        },
        {
          key: 'message',
          value:
            'Привіт брате, дякую тобі за поток, дійсно дуже круто. Продовжуй в тому ж дусі.',
        },
      ],
    };
  }
}
