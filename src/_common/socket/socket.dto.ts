import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export class JoinToRoomEventDto extends createZodDto(
	z.object({
		token: z.string(),
		roomType: z.enum(['ALERT_WIDGETS_GROUP']),
		roomId: z.string(),
	})
) { }