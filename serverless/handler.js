// 'use strict';

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v3.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };

const Alexa = require("ask-sdk-core");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speechText = "Hello, kitty chan is ready to help you!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello, kitty chan is ready to help you!", speechText)
      .getResponse();
  },
};

const HelloKittyIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloKittyIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "kitty said Hello";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("kitty said Hello", speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "You can ask me the weather!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("You can ask me the weather!", speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Goodbye!", speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    // Any clean-up logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, kitty didn't understand you. Please say it again.")
      .reprompt("Sorry, kitty didn't understand you. Please say it again.")
      .getResponse();
  },
};

// exports.handler = Alexa.SkillBuilders.custom()
//   .addRequestHandlers(
//     LaunchRequestHandler,
//     HelloKittyIntentHandler,
//     HelpIntentHandler,
//     CancelAndStopIntentHandler,
//     SessionEndedRequestHandler
//   )
//   .addErrorHandlers(ErrorHandler)
//   .lambda();

  module.exports.hello = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
      LaunchRequestHandler,
      HelloKittyIntentHandler,
      HelpIntentHandler,
      CancelAndStopIntentHandler,
      SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();