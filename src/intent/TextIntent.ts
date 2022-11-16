import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import container from '../core/inversify';
import { TYPES } from '../core/types.inversify';
import { TextService } from '../services/text.service';
import { TEXT } from '../types/text.types';

const textService = container.get<TextService>(TYPES.TextService);
///Greet Users
export const TextIntentHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request: any = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest'
            && request.intent.name === 'TextIntent';
	},

	async handle(handlerInput: HandlerInput): Promise<Response> {
		const request: any = handlerInput.requestEnvelope.request;
		const { serviceClientFactory } = handlerInput;

		///Fetch User info
		const upsServiceClient = serviceClientFactory.getUpsServiceClient();
		try {
			var profileName = await upsServiceClient.getProfileGivenName();
		} catch (error) {
			return handlerInput.responseBuilder
				.speak('We need your First name to create personalized text with your name. Can you please provide First name permission in the kitty chan skill settings')
				.withSimpleCard('Message Sent', 'Message Sent')
				.getResponse();
		}

		const message = request.intent.slots?.message?.slotValue?.value || request.intent.slots?.message?.value;
		console.log(message, '--Message--');
		await textService.textServer(message, profileName, TEXT.message);
        
		return handlerInput.responseBuilder
			.speak('It\'s Sent')
			.reprompt('Anything else?')
			.withSimpleCard('Message Sent', 'Message Sent')
			.getResponse();
	},
};