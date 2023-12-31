import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createDonationAlertTemplateZodSchema = z.object({
  name: z.string().optional(),
  elements: z.object({
    texts: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          text: z.string(),
          styleConfig: z.object({
            fontSize: z.number(),
            fontFamily: z.string(),
            fontWeight: z.string(),
            fontStyle: z.string(),
            textAlign: z.string(),
            textColor: z.string(),
            shadowColor: z.string(),
            shadowSize: z.number(),
          }),
          animationConfig: z.object({
            in: z.string(),
            out: z.string(),
          }),
          positionConfig: z.object({
            top: z.number(),
            left: z.number(),
            width: z.number(),
            height: z.number(),
          }),
        }),
      )
      .optional(),
    images: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          src: z.string(),
          styleConfig: z.object({
            width: z.number(),
            height: z.number(),
          }),
          animationConfig: z.object({
            in: z.string(),
            out: z.string(),
          }),
          positionConfig: z.object({
            top: z.number(),
            left: z.number(),
            width: z.number(),
            height: z.number(),
          }),
        }),
      )
      .optional(),
  }),
});

export class CreateDonationAlertTemplateDto extends createZodDto(
  createDonationAlertTemplateZodSchema,
) {}
