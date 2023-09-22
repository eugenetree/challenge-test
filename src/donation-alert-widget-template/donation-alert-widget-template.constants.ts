import { WidgetTemplateText } from 'src/widget/widget-template-text/widget-template-text';
import { DonationAlertWidgetTemplate } from './donation-alert-widget-template.types';

type TemplateId = string;

// currently it's only one template that is used when user creates his account
// further it'll be provided many default templates and user will be able to choose one of them
export const defaultDonationAlertWidgetTemplates: Record<
  TemplateId,
  DonationAlertWidgetTemplate & {
    textElements: WidgetTemplateText[];
  }
> = {
  ['default/main']: {
    id: '-1',
    createdAt: new Date('1970-01-01T00:00:00.000Z'),
    updatedAt: new Date('1970-01-01T00:00:00.000Z'),
    name: 'Стандартне сповіщення',
    userId: 'default',
    donationAlertWidgetId: '-1',
    textElements: [
      {
        id: '-1',
        createdAt: new Date('1970-01-01T00:00:00.000Z'),
        updatedAt: new Date('1970-01-01T00:00:00.000Z'),
        donationAlertWidgetTemplateId: '-1',
        name: 'Заголовок',
        text: '{sum} закинув {amount}',
        styleConfig: {
          fontSize: 24,
          fontFamily: 'Arial',
          fontWeight: 'normal',
          fontStyle: 'normal',
          color: '#ffffff',
          shadowColor: '#000000',
          shadowSize: 0,
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
};

export const defaultDonationAlertWidgetPositionConfigs = [
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
