// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/_common/database/prisma.service';
// import { ID } from 'src/_common/types';
// import { UiTextElementMapper } from 'src/ui-elements/ui-text-element.mapper';

// @Injectable()
// export class PanelRepository {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly uiTextElementTransformer: UiTextElementMapper,
//   ) {}

//   async getAlertsPage({ userId }: { userId: ID }) {
//     const data = await this.prisma.alertWidget.findMany({
//       where: { userId },
//       orderBy: { createdAt: 'asc' },
//       include: {
//         donationAlerts: {
//           orderBy: { createdAt: 'asc' },
//           include: {
//             donationAlertTemplate: {
//               include: { uiTextElements: true },
//             },
//           },
//         },
//       },
//     });

//     return data.map((group) => ({
//       ...group,
//       donationAlerts: group.donationAlerts.map((widget) => {
//         if (!widget.donationAlertTemplate) return widget;

//         return {
//           ...widget,
//           donationAlertTemplate: {
//             ...widget.donationAlertTemplate,
//             uiTextElements: widget.donationAlertTemplate?.uiTextElements.map(
//               (text) => this.uiTextElementTransformer.fromDbToApp(text),
//             ),
//           },
//         };
//       }),
//     }));
//   }
// }
