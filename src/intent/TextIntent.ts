import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { alias } from '../content/alias_mapping';
import { text_permission_content } from '../content/text.content';
import { voice_permission_content } from '../content/voice.content';
import container from '../core/inversify';
import { TYPES } from '../core/types.inversify';
import { TextService } from '../services/text.service';
import { TEXT } from '../types/text.types';

const textService = container.get<TextService>(TYPES.TextService);
///Greet Users
export const TextIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request: any = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' && request.intent.name === 'TextIntent'
    );
  },

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const request: any = handlerInput.requestEnvelope.request;
    const { serviceClientFactory } = handlerInput;

    ///Fetch User info
    const upsServiceClient = serviceClientFactory.getUpsServiceClient();
    try {
      let profileName = await upsServiceClient.getProfileGivenName();
      ///Set Nicknames - TEMP
      if (alias[profileName]) profileName = alias[profileName];
      if (alias[profileName.toLowerCase()])
        profileName = alias[profileName.toLowerCase()];

      const message =
        request.intent.slots?.message?.slotValue?.value ||
        request.intent.slots?.message?.value;
      console.log(message, '--Message--');
      await textService.textServer(message, profileName, TEXT.message);
    } catch (error) {
      return handlerInput.responseBuilder
        .speak(voice_permission_content.given_name)
        .withAskForPermissionsConsentCard(['alexa::profile:given_name:read'])
        .withSimpleCard(
          'Permission Required',
          text_permission_content.given_name,
        )
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak("It's Sent")
      .reprompt('Anything else?')
      .withSimpleCard('Message Sent', 'Message Sent')
      .getResponse();
  },
};
