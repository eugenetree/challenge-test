import { UiTextElement } from 'src/ui-elements/ui-text-element';
import { DonationAlertTemplate } from './donation-alert-template.types';

type TemplateId = string;

// currently it's only one template that is used when user creates his account
// further it'll be provided many default templates and user will be able to choose one of them
export const defaultDonationAlertTemplates: Record<
  TemplateId,
  DonationAlertTemplate
> = {
  ['default/main']: {
    id: '-1',
    createdAt: new Date('1970-01-01T00:00:00.000Z'),
    updatedAt: new Date('1970-01-01T00:00:00.000Z'),
    name: 'Стандартне сповіщення',
    userId: 'default',
    donationAlertId: '-1',
    elements: {
      texts: [
        {
          name: 'Заголовок',
          text: '{sum} закинув {amount}',
          styleConfig: {
            fontSize: 45,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontStyle: 'normal',
            align: 'center',
            color: '#ffffff',
            shadowColor: '#000000',
            shadowSize: 3,
          },
          animationConfig: {
            in: 'fade',
            out: 'fade',
          },
          positionConfig: {
            top: 0,
            left: 0,
            width: 100,
            height: 100,
          },
        },
        {
          name: 'Текст донату',
          text: 'Привіт брате, дякую тобі за поток, дійсно дуже круто. Продовжуй в тому ж дусі.',
          styleConfig: {
            fontSize: 25,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontStyle: 'normal',
            align: 'center',
            color: '#ffffff',
            shadowColor: '#000000',
            shadowSize: 3,
          },
          animationConfig: {
            in: 'fade',
            out: 'fade',
          },
          positionConfig: {
            top: 0,
            left: 0,
            width: 100,
            height: 100,
          },
        },
      ],
      images: [
        {
          name: 'Зображення',
          src: 'https://i.gifer.com/xv.gif  ',
          styleConfig: {
            width: 100,
            height: 100,
          },
          animationConfig: {
            in: 'fade',
            out: 'fade',
          },
          positionConfig: {
            top: 0,
            left: 0,
            width: 100,
            height: 100,
          },
        },
      ],
    },
  },
};

export const defaultDonationAlertPositionConfigs = [
  {
    textPrimary: {
      top: 50,
      left: 100,
      width: 200,
      height: 300,
    },
    textSecondary: {
      top: 380,
      left: 50,
      width: 600,
      height: 200,
    },
    image: {
      top: 0,
      left: 300,
      width: 300,
      height: 50,
    },
  },
];
