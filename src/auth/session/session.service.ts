import { Injectable } from '@nestjs/common';
import { SESSION_KEYS } from './session.constants';

@Injectable()
export class SessionService {
  getUserId(session: any): string | undefined {
    const userId = session?.[SESSION_KEYS.USER_ID];
    return typeof userId === 'string' ? userId : undefined;
  }

  setUserId(session: any, id: string) {
    if (session) session[SESSION_KEYS.USER_ID] = id;
  }

  destoySession(session: any) {
    session.destroy();
  }
}
