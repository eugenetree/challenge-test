import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionService } from './session/session.service';

@Injectable()
export class AuthSessionGuard implements CanActivate {
  constructor(private readonly sesssionService: SessionService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = this.sesssionService.getUserId(request.session);
    return typeof userId === 'string';
  }
}
