"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = exports.heard = void 0;var _botkit = require("botkit");
var _request = _interopRequireDefault(require("request"));
var _alexaResponse = _interopRequireDefault(require("alexa-response"));var _this = void 0;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

var heard = function heard(storage) {return function (bot, message, next) {
    if (message.alexa && message.intent && message.intent.name && storage && storage.responses) {
      console.log("fetching intent: ".concat(message.intent.name));
      storage.responses.get(message.intent.name).
      then(function (response) {
        if (response) {
          return bot.reply(message, response.response);
        }
        next();
      });
    } else {
      next();
    }
  };};exports.heard = heard;

var AlexaBot = function AlexaBot(configuration) {
  // Create a core botkit bot
  var alexaBot = (0, _botkit.core)(configuration || {});

  alexaBot.on('sessionStart', function (bot, message) {
    if (!message) return;
    bot.send({
      text: configuration.welcomeMessage || 'Hi, how can I help?',
      user: message.user,
      channel: message.channel,
      to: message.user,
      send: message.raw_message.send,
      question: true });

  });

  // customize the bot definition, which will be used when new connections
  // spawn!
  alexaBot.defineBot(function (botkit, config) {
    var bot = {
      type: 'alexa',
      botkit: botkit,
      config: config || {},
      utterances: botkit.utterances };


    bot.startConversation = function (message, cb) {
      botkit.startConversation(_this, message, cb);
    };

    bot.createConversation = function (message, cb) {
      botkit.createConversation(_this, message, cb);
    };

    bot.findConversation = function (message, cb) {
      botkit.debug('CUSTOM FIND CONVO', message.user, message.channel);
      /* eslint-disable no-plusplus */
      for (var t = 0; t < botkit.tasks.length; t++) {
        for (var c = 0; c < botkit.tasks[t].convos.length; c++) {
          var con = botkit.tasks[t].convos[c];
          if (con.isActive() && con.source_message.user === message.user) {
            botkit.debug('FOUND EXISTING CONVO!');
            cb(botkit.tasks[t].convos[c]);
            return;
          }
        }
        /* eslint-enable */
      }
      cb();
    };

    bot.send = function (message) {var
      text = message.text,question = message.question,progressive = message.progressive,send = message.send,typing = message.typing;
      if (progressive || typing) {
        (0, _request["default"])({
          method: 'POST',
          url: "".concat(message.alexa.apiEndpoint, "/v1/directives"),
          auth: {
            bearer: message.alexa.apiAccessToken },

          json: true,
          body: {
            header: {
              requestId: message.channel },

            directive: {
              type: 'VoicePlayer.Speak',
              speech: text } } });



      } else {
        var reply = question ?
        _alexaResponse["default"].ask(text) :
        _alexaResponse["default"].say(text);
        send(reply.build());
      }
    };

    bot.reply = function (src, resp, cb) {
      var message = typeof resp == 'string' ?
      { text: resp } :
      resp;

      message.user = src.user;
      message.channel = src.channel;
      message.to = src.user;
      message.send = src.send;
      message.alexa = src.alexa;

      bot.send(message, cb);
    };

    return bot;
  });

  // set up a web route for receiving incoming requests from alexa
  alexaBot.createWebhookEndpoints = function (webserver, bot) {
    // notify the user that the webhook is running
    alexaBot.log("** Serving webhook endpoint for Alexa Platform at: http://".concat(alexaBot.config.hostname, ":").concat(alexaBot.config.port, "/alexa/receive"));
    webserver.post('/alexa/receive', function (_ref, res) {var body = _ref.body;
      alexaBot.debug('GOT A MESSAGE HOOK');

      var normalizeTypes = {
        LaunchRequest: 'sessionStart',
        IntentRequest: 'message_received',
        SessionEndedRequest: 'conversationEnded' };var


      session = body.session,request = body.request,context = body.context;
      var userIdArr = session && session.user && session.user.userId && session.user.userId.split('.');
      var userId = userIdArr && userIdArr[userIdArr.length - 1];
      // parse the request from alexa
      var payload = {
        text: request.intent ? request.intent.name : '',
        type: normalizeTypes[request.type] || request.type,
        intent: request.intent,
        slots: request.intent && request.intent.slots,
        user: userId,
        channel: request && request.requestId,
        timestamp: request.timestamp,
        platform: 'alexa',
        alexa: context && context.System,
        send: function send() {return res.send.apply(res, arguments);}

        // notify botkit we received an event
      };alexaBot.ingest(bot, payload, res);
    });

    return alexaBot;
  };

  return alexaBot;
};var _default =

AlexaBot;exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImhlYXJkIiwic3RvcmFnZSIsImJvdCIsIm1lc3NhZ2UiLCJuZXh0IiwiYWxleGEiLCJpbnRlbnQiLCJuYW1lIiwicmVzcG9uc2VzIiwiY29uc29sZSIsImxvZyIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsInJlcGx5IiwiQWxleGFCb3QiLCJjb25maWd1cmF0aW9uIiwiYWxleGFCb3QiLCJvbiIsInNlbmQiLCJ0ZXh0Iiwid2VsY29tZU1lc3NhZ2UiLCJ1c2VyIiwiY2hhbm5lbCIsInRvIiwicmF3X21lc3NhZ2UiLCJxdWVzdGlvbiIsImRlZmluZUJvdCIsImJvdGtpdCIsImNvbmZpZyIsInR5cGUiLCJ1dHRlcmFuY2VzIiwic3RhcnRDb252ZXJzYXRpb24iLCJjYiIsImNyZWF0ZUNvbnZlcnNhdGlvbiIsImZpbmRDb252ZXJzYXRpb24iLCJkZWJ1ZyIsInQiLCJ0YXNrcyIsImxlbmd0aCIsImMiLCJjb252b3MiLCJjb24iLCJpc0FjdGl2ZSIsInNvdXJjZV9tZXNzYWdlIiwicHJvZ3Jlc3NpdmUiLCJ0eXBpbmciLCJtZXRob2QiLCJ1cmwiLCJhcGlFbmRwb2ludCIsImF1dGgiLCJiZWFyZXIiLCJhcGlBY2Nlc3NUb2tlbiIsImpzb24iLCJib2R5IiwiaGVhZGVyIiwicmVxdWVzdElkIiwiZGlyZWN0aXZlIiwic3BlZWNoIiwiQWxleGFSZXNwb25zZSIsImFzayIsInNheSIsImJ1aWxkIiwic3JjIiwicmVzcCIsImNyZWF0ZVdlYmhvb2tFbmRwb2ludHMiLCJ3ZWJzZXJ2ZXIiLCJob3N0bmFtZSIsInBvcnQiLCJwb3N0IiwicmVzIiwibm9ybWFsaXplVHlwZXMiLCJMYXVuY2hSZXF1ZXN0IiwiSW50ZW50UmVxdWVzdCIsIlNlc3Npb25FbmRlZFJlcXVlc3QiLCJzZXNzaW9uIiwicmVxdWVzdCIsImNvbnRleHQiLCJ1c2VySWRBcnIiLCJ1c2VySWQiLCJzcGxpdCIsInBheWxvYWQiLCJzbG90cyIsInRpbWVzdGFt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SWVGLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb3JlIH0gZnJvbSAnYm90a2l0J1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCdcbmltcG9ydCBBbGV4YVJlc3BvbnNlIGZyb20gJ2FsZXhhLXJlc3BvbnNlJ1xuXG5leHBvcnQgY29uc3QgaGVhcmQgPSBzdG9yYWdlID0+IChib3QsIG1lc3NhZ2UsIG5leHQpID0+IHtcbiAgaWYgKG1lc3NhZ2UuYWxleGEgJiYgbWVzc2FnZS5pbnRlbnQgJiYgbWVzc2FnZS5pbnRlbnQubmFtZSAmJiBzdG9yYWdlICYmIHN0b3JhZ2UucmVzcG9uc2VzKSB7XG4gICAgY29uc29sZS5sb2coYGZldGNoaW5nIGludGVudDogJHttZXNzYWdlLmludGVudC5uYW1lfWApXG4gICAgc3RvcmFnZS5yZXNwb25zZXMuZ2V0KG1lc3NhZ2UuaW50ZW50Lm5hbWUpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBib3QucmVwbHkobWVzc2FnZSwgcmVzcG9uc2UucmVzcG9uc2UpXG4gICAgICAgIH1cbiAgICAgICAgbmV4dCgpXG4gICAgICB9KVxuICB9IGVsc2Uge1xuICAgIG5leHQoKVxuICB9XG59XG5cbmNvbnN0IEFsZXhhQm90ID0gKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgLy8gQ3JlYXRlIGEgY29yZSBib3RraXQgYm90XG4gIGNvbnN0IGFsZXhhQm90ID0gY29yZShjb25maWd1cmF0aW9uIHx8IHt9KVxuXG4gIGFsZXhhQm90Lm9uKCdzZXNzaW9uU3RhcnQnLCAoYm90LCBtZXNzYWdlKSA9PiB7XG4gICAgaWYgKCFtZXNzYWdlKSByZXR1cm5cbiAgICBib3Quc2VuZCh7XG4gICAgICB0ZXh0OiBjb25maWd1cmF0aW9uLndlbGNvbWVNZXNzYWdlIHx8ICdIaSwgaG93IGNhbiBJIGhlbHA/JyxcbiAgICAgIHVzZXI6IG1lc3NhZ2UudXNlcixcbiAgICAgIGNoYW5uZWw6IG1lc3NhZ2UuY2hhbm5lbCxcbiAgICAgIHRvOiBtZXNzYWdlLnVzZXIsXG4gICAgICBzZW5kOiBtZXNzYWdlLnJhd19tZXNzYWdlLnNlbmQsXG4gICAgICBxdWVzdGlvbjogdHJ1ZVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gY3VzdG9taXplIHRoZSBib3QgZGVmaW5pdGlvbiwgd2hpY2ggd2lsbCBiZSB1c2VkIHdoZW4gbmV3IGNvbm5lY3Rpb25zXG4gIC8vIHNwYXduIVxuICBhbGV4YUJvdC5kZWZpbmVCb3QoKGJvdGtpdCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgYm90ID0ge1xuICAgICAgdHlwZTogJ2FsZXhhJyxcbiAgICAgIGJvdGtpdCxcbiAgICAgIGNvbmZpZzogY29uZmlnIHx8IHt9LFxuICAgICAgdXR0ZXJhbmNlczogYm90a2l0LnV0dGVyYW5jZXNcbiAgICB9XG5cbiAgICBib3Quc3RhcnRDb252ZXJzYXRpb24gPSAobWVzc2FnZSwgY2IpID0+IHtcbiAgICAgIGJvdGtpdC5zdGFydENvbnZlcnNhdGlvbih0aGlzLCBtZXNzYWdlLCBjYilcbiAgICB9XG5cbiAgICBib3QuY3JlYXRlQ29udmVyc2F0aW9uID0gKG1lc3NhZ2UsIGNiKSA9PiB7XG4gICAgICBib3RraXQuY3JlYXRlQ29udmVyc2F0aW9uKHRoaXMsIG1lc3NhZ2UsIGNiKVxuICAgIH1cblxuICAgIGJvdC5maW5kQ29udmVyc2F0aW9uID0gKG1lc3NhZ2UsIGNiKSA9PiB7XG4gICAgICBib3RraXQuZGVidWcoJ0NVU1RPTSBGSU5EIENPTlZPJywgbWVzc2FnZS51c2VyLCBtZXNzYWdlLmNoYW5uZWwpXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBib3RraXQudGFza3MubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBib3RraXQudGFza3NbdF0uY29udm9zLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgY29uc3QgY29uID0gYm90a2l0LnRhc2tzW3RdLmNvbnZvc1tjXVxuICAgICAgICAgIGlmIChjb24uaXNBY3RpdmUoKSAmJiBjb24uc291cmNlX21lc3NhZ2UudXNlciA9PT0gbWVzc2FnZS51c2VyKSB7XG4gICAgICAgICAgICBib3RraXQuZGVidWcoJ0ZPVU5EIEVYSVNUSU5HIENPTlZPIScpXG4gICAgICAgICAgICBjYihib3RraXQudGFza3NbdF0uY29udm9zW2NdKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgICB9XG4gICAgICBjYigpXG4gICAgfVxuXG4gICAgYm90LnNlbmQgPSAobWVzc2FnZSkgPT4ge1xuICAgICAgY29uc3QgeyB0ZXh0LCBxdWVzdGlvbiwgcHJvZ3Jlc3NpdmUsIHNlbmQsIHR5cGluZyB9ID0gbWVzc2FnZVxuICAgICAgaWYgKHByb2dyZXNzaXZlIHx8IHR5cGluZykge1xuICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6IGAke21lc3NhZ2UuYWxleGEuYXBpRW5kcG9pbnR9L3YxL2RpcmVjdGl2ZXNgLFxuICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgIGJlYXJlcjogbWVzc2FnZS5hbGV4YS5hcGlBY2Nlc3NUb2tlblxuICAgICAgICAgIH0sXG4gICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgcmVxdWVzdElkOiBtZXNzYWdlLmNoYW5uZWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXJlY3RpdmU6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ1ZvaWNlUGxheWVyLlNwZWFrJyxcbiAgICAgICAgICAgICAgc3BlZWNoOiB0ZXh0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVwbHkgPSBxdWVzdGlvblxuICAgICAgICAgID8gQWxleGFSZXNwb25zZS5hc2sodGV4dClcbiAgICAgICAgICA6IEFsZXhhUmVzcG9uc2Uuc2F5KHRleHQpXG4gICAgICAgIHNlbmQocmVwbHkuYnVpbGQoKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBib3QucmVwbHkgPSAoc3JjLCByZXNwLCBjYikgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHR5cGVvZiAocmVzcCkgPT0gJ3N0cmluZydcbiAgICAgICAgPyB7IHRleHQ6IHJlc3AgfVxuICAgICAgICA6IHJlc3BcblxuICAgICAgbWVzc2FnZS51c2VyID0gc3JjLnVzZXJcbiAgICAgIG1lc3NhZ2UuY2hhbm5lbCA9IHNyYy5jaGFubmVsXG4gICAgICBtZXNzYWdlLnRvID0gc3JjLnVzZXJcbiAgICAgIG1lc3NhZ2Uuc2VuZCA9IHNyYy5zZW5kXG4gICAgICBtZXNzYWdlLmFsZXhhID0gc3JjLmFsZXhhXG5cbiAgICAgIGJvdC5zZW5kKG1lc3NhZ2UsIGNiKVxuICAgIH1cblxuICAgIHJldHVybiBib3RcbiAgfSlcblxuICAvLyBzZXQgdXAgYSB3ZWIgcm91dGUgZm9yIHJlY2VpdmluZyBpbmNvbWluZyByZXF1ZXN0cyBmcm9tIGFsZXhhXG4gIGFsZXhhQm90LmNyZWF0ZVdlYmhvb2tFbmRwb2ludHMgPSAod2Vic2VydmVyLCBib3QpID0+IHtcbiAgICAvLyBub3RpZnkgdGhlIHVzZXIgdGhhdCB0aGUgd2ViaG9vayBpcyBydW5uaW5nXG4gICAgYWxleGFCb3QubG9nKGAqKiBTZXJ2aW5nIHdlYmhvb2sgZW5kcG9pbnQgZm9yIEFsZXhhIFBsYXRmb3JtIGF0OiBodHRwOi8vJHthbGV4YUJvdC5jb25maWcuaG9zdG5hbWV9OiR7YWxleGFCb3QuY29uZmlnLnBvcnR9L2FsZXhhL3JlY2VpdmVgKVxuICAgIHdlYnNlcnZlci5wb3N0KCcvYWxleGEvcmVjZWl2ZScsICh7IGJvZHkgfSwgcmVzKSA9PiB7XG4gICAgICBhbGV4YUJvdC5kZWJ1ZygnR09UIEEgTUVTU0FHRSBIT09LJylcblxuICAgICAgY29uc3Qgbm9ybWFsaXplVHlwZXMgPSB7XG4gICAgICAgIExhdW5jaFJlcXVlc3Q6ICdzZXNzaW9uU3RhcnQnLFxuICAgICAgICBJbnRlbnRSZXF1ZXN0OiAnbWVzc2FnZV9yZWNlaXZlZCcsXG4gICAgICAgIFNlc3Npb25FbmRlZFJlcXVlc3Q6ICdjb252ZXJzYXRpb25FbmRlZCdcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBzZXNzaW9uLCByZXF1ZXN0LCBjb250ZXh0IH0gPSBib2R5XG4gICAgICBjb25zdCB1c2VySWRBcnIgPSBzZXNzaW9uICYmIHNlc3Npb24udXNlciAmJiBzZXNzaW9uLnVzZXIudXNlcklkICYmIHNlc3Npb24udXNlci51c2VySWQuc3BsaXQoJy4nKVxuICAgICAgY29uc3QgdXNlcklkID0gdXNlcklkQXJyICYmIHVzZXJJZEFyclt1c2VySWRBcnIubGVuZ3RoIC0gMV1cbiAgICAgIC8vIHBhcnNlIHRoZSByZXF1ZXN0IGZyb20gYWxleGFcbiAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICB0ZXh0OiByZXF1ZXN0LmludGVudCA/IHJlcXVlc3QuaW50ZW50Lm5hbWUgOiAnJyxcbiAgICAgICAgdHlwZTogbm9ybWFsaXplVHlwZXNbcmVxdWVzdC50eXBlXSB8fCByZXF1ZXN0LnR5cGUsXG4gICAgICAgIGludGVudDogcmVxdWVzdC5pbnRlbnQsXG4gICAgICAgIHNsb3RzOiByZXF1ZXN0LmludGVudCAmJiByZXF1ZXN0LmludGVudC5zbG90cyxcbiAgICAgICAgdXNlcjogdXNlcklkLFxuICAgICAgICBjaGFubmVsOiByZXF1ZXN0ICYmIHJlcXVlc3QucmVxdWVzdElkLFxuICAgICAgICB0aW1lc3RhbXA6IHJlcXVlc3QudGltZXN0YW1wLFxuICAgICAgICBwbGF0Zm9ybTogJ2FsZXhhJyxcbiAgICAgICAgYWxleGE6IGNvbnRleHQgJiYgY29udGV4dC5TeXN0ZW0sXG4gICAgICAgIHNlbmQ6ICguLi5hcmdzKSA9PiByZXMuc2VuZCguLi5hcmdzKVxuICAgICAgfVxuICAgICAgLy8gbm90aWZ5IGJvdGtpdCB3ZSByZWNlaXZlZCBhbiBldmVudFxuICAgICAgYWxleGFCb3QuaW5nZXN0KGJvdCwgcGF5bG9hZCwgcmVzKVxuICAgIH0pXG5cbiAgICByZXR1cm4gYWxleGFCb3RcbiAgfVxuXG4gIHJldHVybiBhbGV4YUJvdFxufVxuXG5leHBvcnQgZGVmYXVsdCBBbGV4YUJvdFxuIl19