import { Controller, Get, Query, Res, ServiceUnavailableException, Session, UseFilters } from "@nestjs/common";
import { Response } from "express";

import { TwitchAuthExceptionsFilter } from "./twitch-auth.filter";
import { LoggerService } from "src/_common/logger/logger.service";
import { TwitchAuthUsecase } from "./twitch-auth.usecase";
import { SessionService } from "src/auth/session/session.service";
import { TwitchAuthCallbackDto, TwitchAuthInitDto } from "./twitch-auth.dto";

@UseFilters(TwitchAuthExceptionsFilter)
@Controller('auth/twitch')
export class TwitchAuthController {
  constructor(
    private readonly twitchAuthService: TwitchAuthUsecase,
    private readonly sessionService: SessionService,
    private readonly loggerService: LoggerService,
  ) { }

  @Get('redirect')
  async redirect(
    @Query() query: TwitchAuthInitDto,
    @Res() res: Response,
  ) {
    const redirectUrl = this.twitchAuthService.getUrlToBeginAuth({
      successUrl: query.successUrl,
      failUrl: query.failUrl,
    })

    this.loggerService.info(TwitchAuthController.name, `Init user auth, redirecting to: ${redirectUrl}`);

    res.redirect(redirectUrl);
  }

  // if user already logged in - link provider to account
  // if user not logged in - create new account via provider
  // TODO: provide better validation for single params
  @Get('callback')
  async callback(
    @Res() res: Response,
    @Query() query: TwitchAuthCallbackDto,
    @Session() session,
  ) {
    const { code, state, error } = query;
    const { successUrl, failUrl } = this.twitchAuthService.getRedirectUrlsFromCallback(state);
    
    try {
      if (error) throw new ServiceUnavailableException(error);

      const userId = this.sessionService.getUserId(session);
      if (userId) await this.twitchAuthService.linkProviderToAccount({ code, userId });
      else {
        const user = await this.twitchAuthService.authenticate(code);
        this.sessionService.setUserId(session, user.id);
      }

      res.redirect(successUrl);
    } catch (err) {
      if (failUrl) res.redirect(failUrl);
      throw err;
      // TODO: make better service errors handling 
      //  (OauthProviderWasAlreadyUsedError, IncorrectCallbackUrlError)
    }
  }
}

// 
