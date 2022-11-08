import { inject, injectable } from 'inversify';
import { TYPES } from '../core/types.inversify';
import { SharedService } from './shared/shared.service';

@injectable()
export class TextService{
	constructor(
        @inject(TYPES.SharedService) private readonly sharedService: SharedService
	) { }
    
	async textServer(message: string, username: string) {
        
		await this.sharedService.axiosInstance({
			method: 'post',
			route: 'alexa/ask/server/text',
			body: {
				username,
				message
			}
		});

		return;
	}
}