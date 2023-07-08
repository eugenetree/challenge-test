import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export class JoinToRoomEventDto extends createZodDto(
	z.object({
		token: z.string(),
		alertWidgetsGroupId: z.string(),
	})
) { }