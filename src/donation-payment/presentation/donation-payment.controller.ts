import { Body, Controller, Get, HttpCode, Post, Query, Res } from '@nestjs/common';
import {  Response } from 'express';
import { DonationPaymentService } from '../application/donation-payment.service';
import { DonationPaymentCallbackBodyDto, DonationPaymentCallbackQueryDto, DonationPaymentRedirectDto } from './donation-payment.dto';

@Controller('donation-payments')
export class DonationPaymentController {
  constructor(
    private readonly donationPaymentService: DonationPaymentService,
  ) { }

  @Get('redirect')
  async redirect(
    @Query() dto: DonationPaymentRedirectDto,
    @Res() res: Response,
  ) {
    const { redirectUrlAfterPayment, ...donationInput } = dto;
    const redirectUrl = await this.donationPaymentService.createRedirectUrlToPaymentPage({
      donationInput,
      redirectUrlAfterPayment,
      callbackUrlPathAfterPayment: 'donation-payments/callback',
    });

    res.redirect(redirectUrl);
  }

  @Post('callback')
  // 200 code is needed because of 'fondy' requirements
  @HttpCode(200)
  callback(
    @Body() data: DonationPaymentCallbackBodyDto,
    @Query() { id }: DonationPaymentCallbackQueryDto,
  ) {
    this.donationPaymentService.handleSuccessCallback({
      id,
      paymentData: data
    })
  }
}