import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { createDonationAlertTemplateZodSchema } from 'src/donation-alert-template/donation-alert-template.dto';

const baseFieldsSchema = z.object({
  alertName: z.string().min(1,),
  widgetId: z.string().min(1),
  isEnabled: z.boolean(),
  duration: z.number().positive(),
});

export const alertSchema = z.discriminatedUnion('alertCondition', [
  baseFieldsSchema.merge(z.object({ alertCondition: z.literal('random') })),
  baseFieldsSchema.merge(
    z.object({
      alertCondition: z.literal('specificAmount'),
      specificAmount: z.number().positive().int(),
    }),
  ),
  baseFieldsSchema.merge(
    z.object({
      alertCondition: z.literal('minMaxAmount'),
      minAmount: z.number().positive().int(),
      maxAmount: z.number().positive().int(),
    }),
  ),
]);


export class CreateDonationAlertDto extends createZodDto(
  z.object({
    alert: alertSchema,
    template: createDonationAlertTemplateZodSchema,
  }),
) {}
