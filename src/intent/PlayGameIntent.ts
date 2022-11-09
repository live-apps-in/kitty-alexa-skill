import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import container from '../core/inversify';
import { TYPES } from '../core/types.inversify';
import { TextService } from '../services/text.service';
import { TEXT } from '../types/text.types';

const textService = container.get<TextService>(TYPES.TextService);
///Greet Users
export const PlayGameIntentHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request: any = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest'
            && request.intent.name === 'PlayGameIntent';
	},

	async handle(handlerInput: HandlerInput): Promise<Response> {
		const request: any = handlerInput.requestEnvelope.request;
		const { serviceClientFactory } = handlerInput;

		///Fetch User info
		const upsServiceClient = serviceClientFactory.getUpsServiceClient();
		const profileName = await upsServiceClient.getProfileGivenName();

		const message = request.intent.slots?.message?.slotValue?.value || request.intent.slots?.message?.value;

		await textService.textServer(message, profileName, TEXT.playGame);

		return handlerInput.responseBuilder
			.speak('It\'s Sent')
			.reprompt('Anything else?')
			.withSimpleCard('Message Sent', 'Message Sent')
			.getResponse();
	},
};