import {
	ExceptionFilter,
	Catch,
} from '@nestjs/common';
import { LoggerService } from 'src/_common/logger/logger.service';
import { SettingsService } from 'src/_common/settings/settings.service';

@Catch()
export class DonationPaymentsExceptionFilter implements ExceptionFilter {
	constructor(
		private readonly settingsService: SettingsService,
		private readonly loggerService: LoggerService,
	) { }

	catch: ExceptionFilter['catch'] = (exception, host) => {
		const res = host.switchToHttp().getResponse();
		res.redirect(this.settingsService.FRONT_APP_URL + '?failure=true');
		this.loggerService.error(DonationPaymentsExceptionFilter.name, exception);
	}
}