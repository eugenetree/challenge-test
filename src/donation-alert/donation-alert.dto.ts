import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { createDonationAlertTemplateZodSchema } from 'src/donation-alert-template/donation-alert-template.dto';

export class CreateDonationAlertDto extends createZodDto(
  z.object({
    name: z.string().optional(),
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
    specificAmount: z.number().optional(),
    isEnabled: z.boolean().optional(),
    duration: z.number().optional(),
    template: createDonationAlertTemplateZodSchema,
  }),
) {}
