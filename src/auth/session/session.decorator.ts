import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SESSION_KEYS } from './session.constants';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.session[SESSION_KEYS.USER_ID];
    return typeof userId === "number" ? userId : undefined;
  },
);