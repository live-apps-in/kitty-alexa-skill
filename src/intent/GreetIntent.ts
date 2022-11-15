import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

///Greet Users
export const GreetIntentHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request: any = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest'
            && request.intent.name === 'GreetIntent';
	},

	async handle(handlerInput: HandlerInput): Promise<Response> {
		const { serviceClientFactory } = handlerInput;

		///fetch User info
		const upsServiceClient = serviceClientFactory.getUpsServiceClient();
		const profileName = await upsServiceClient.getProfileGivenName();

		const speechResponse = `Hello, ${profileName}`;
		console.log(profileName, '------profile name------');

		return handlerInput.responseBuilder
			.speak(speechResponse)
			.reprompt('Nice to meet you!')
			.withSimpleCard(speechResponse, speechResponse)
			.getResponse();
	},
};