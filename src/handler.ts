import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';

import * as Alexa from 'ask-sdk';

///Intents
import { GreetIntentHandler } from './intent/GreetIntent';
import { TextIntentHandler } from './intent/TextIntent';

const LaunchRequestHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'LaunchRequest';
	},
	handle(handlerInput: HandlerInput): Response {
		const speechText = 'Hello, kitty chan is ready to help you!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('kitty chan', speechText)
			.getResponse();
	},
};



const HelpIntentHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput: HandlerInput): Response {
		const speechText = 'You can ask me the weather!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('You can ask me the weather!', speechText)
			.getResponse();
	},
};

const CancelAndStopIntentHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.CancelIntent'
                || request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput: HandlerInput): Response {
		const speechText = 'Goodbye!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Goodbye!', speechText)
			.withShouldEndSession(true)
			.getResponse();
	},
};


const SessionEndedRequestHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput): boolean {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'SessionEndedRequest';
	},
	handle(handlerInput: HandlerInput): Response {
		console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

		return handlerInput.responseBuilder.getResponse();
	},
};

const ErrorHandler: ErrorHandler = {
	canHandle(handlerInput: HandlerInput, error: Error): boolean {
		return true;
	},
	handle(handlerInput: HandlerInput, error: Error): Response {
		console.log(`Error handled: ${error.message}`);

		return handlerInput.responseBuilder
			.speak('Sorry, I don\'t understand your command. Please say it again.')
			.reprompt('Sorry, I don\'t understand your command. Please say it again.')
			.getResponse();
	}
};


module.exports.hello = SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequestHandler,
		GreetIntentHandler,
		TextIntentHandler,
		HelpIntentHandler,
		CancelAndStopIntentHandler,
		SessionEndedRequestHandler,
	)
	.addErrorHandlers(ErrorHandler)
	.withApiClient(new Alexa.DefaultApiClient())
	.lambda();