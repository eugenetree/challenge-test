import { UiTextElement } from 'src/ui-elements/ui-text-element';
import { DonationAlertTemplate } from './donation-alert-template.types';

type TemplateId = string;

// currently it's only one template that is used when user creates his account
// further it'll be provided many default templates and user will be able to choose one of them
export const defaultDonationAlertTemplates: { default: DonationAlertTemplate } =
  {
    default: {
      id: '-1',
      createdAt: new Date('1970-01-01T00:00:00.000Z'),
      updatedAt: new Date('1970-01-01T00:00:00.000Z'),
      name: 'Стандартне сповіщення',
      userId: 'default',
      donationAlertId: '-1',
      elements: {
        texts: [
          {
            id: '0',
            name: 'Заголовок',
            text: '{name} закинув {amount} {currency}',
            styleConfig: {
              fontSize: 45,
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontStyle: 'normal',
              textAlign: 'center',
              textColor: '#ffffff',
              shadowColor: '#add8e6',
              shadowSize: 3,
            },
            animationConfig: {
              in: 'fade',
              out: 'fade',
            },
            positionConfig: {
              top: 300,
              left: 25,
              width: 750,
              height: 70,
            },
          },
          {
            id: '1',
            name: 'Текст донату',
            text: '{message}',
            styleConfig: {
              fontSize: 25,
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontStyle: 'normal',
              textAlign: 'center',
              textColor: '#ffffff',
              shadowColor: '#add8e6',
              shadowSize: 3,
            },
            animationConfig: {
              in: 'fade',
              out: 'fade',
            },
            positionConfig: {
              top: 375,
              left: 25,
              width: 750,
              height: 200,
            },
          },
        ],
        images: [
          {
            id: '0',
            name: 'Зображення',
            src: 'https://i.gifer.com/xv.gif',
            styleConfig: {
              width: 100,
              height: 100,
            },
            animationConfig: {
              in: 'fade',
              out: 'fade',
            },
            positionConfig: {
              top: 25,
              left: 275,
              width: 250,
              height: 250,
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
