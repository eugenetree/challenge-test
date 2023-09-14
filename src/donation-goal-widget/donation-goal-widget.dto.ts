import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class CreateDonationGoalWidgetDto extends createZodDto(
	z.object({
    textWhenRaisingInProgress: z.string().optional(),
    textWhenRaisingIsFinished: z.string().optional(),
    endDate: z.date().optional(),
    isWidgetEnabled: z.boolean().optional(),
	})
) { }