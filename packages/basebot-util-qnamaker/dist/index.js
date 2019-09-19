"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

function _default(logger, defaultResponse) {return (/*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bot, message) {var info, error, threshold, url, res;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!
                message.intent) {_context.next = 2;break;}return _context.abrupt("return", bot.reply(message, defaultResponse));case 2:
                info = logger('qnaMaker', 'info');
                error = logger('qnaMaker', 'error');
                threshold = process.env.QNA_THRESHOLD || 70;if (!(
                !process.env.QNA_HOST || !process.env.QNA_KBID || !process.env.QNA_KEY)) {_context.next = 8;break;}
                info('not using QNA Maker as no key provided');return _context.abrupt("return",
                bot.reply(message, "Didn't catch that, sorry"));case 8:

                url = "".concat(process.env.QNA_HOST, "/knowledgebases/").concat(process.env.QNA_KBID, "/generateAnswer");_context.prev = 9;_context.next = 12;return (

                  _requestPromiseNative["default"].post(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': "EndpointKey ".concat(process.env.QNA_KEY) },

                    json: { question: message.text } }));case 12:res = _context.sent;if (!(

                res.answers && res.answers.length && res.answers[0].score > threshold)) {_context.next = 17;break;}return _context.abrupt("return",
                bot.reply(message, res.answers[0].answer));case 17:return _context.abrupt("return",

                bot.reply(message, defaultResponse));case 18:_context.next = 24;break;case 20:_context.prev = 20;_context.t0 = _context["catch"](9);


                bot.reply(message, "Didn't catch that, sorry");
                error('Could not check QNA Maker', _context.t0);case 24:case "end":return _context.stop();}}}, _callee, null, [[9, 20]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());};exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsImRlZmF1bHRSZXNwb25zZSIsImJvdCIsIm1lc3NhZ2UiLCJpbnRlbnQiLCJyZXBseSIsImluZm8iLCJlcnJvciIsInRocmVzaG9sZCIsInByb2Nlc3MiLCJlbnYiLCJRTkFfVEhSRVNIT0xEIiwiUU5BX0hPU1QiLCJRTkFfS0JJRCIsIlFOQV9LRVkiLCJ1cmwiLCJyZXF1ZXN0IiwicG9zdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJqc29uIiwicXVlc3Rpb24iLCJ0ZXh0IiwicmVzIiwiYW5zd2VycyIsImxlbmd0aCIsInNjb3JlIiwiYW5zd2VyIl0sIm1hcHBpbmdzIjoidUdBQUEsc0Y7O0FBRWUsa0JBQUNBLE1BQUQsRUFBU0MsZUFBVCx3R0FBNkIsaUJBQWVDLEdBQWYsRUFBb0JDLE9BQXBCO0FBQ3RDQSxnQkFBQUEsT0FBTyxDQUFDQyxNQUQ4Qiw2REFDZkYsR0FBRyxDQUFDRyxLQUFKLENBQVVGLE9BQVYsRUFBbUJGLGVBQW5CLENBRGU7QUFFcENLLGdCQUFBQSxJQUZvQyxHQUU3Qk4sTUFBTSxDQUFDLFVBQUQsRUFBYSxNQUFiLENBRnVCO0FBR3BDTyxnQkFBQUEsS0FIb0MsR0FHNUJQLE1BQU0sQ0FBQyxVQUFELEVBQWEsT0FBYixDQUhzQjtBQUlwQ1EsZ0JBQUFBLFNBSm9DLEdBSXhCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBWixJQUE2QixFQUpMO0FBS3RDLGlCQUFDRixPQUFPLENBQUNDLEdBQVIsQ0FBWUUsUUFBYixJQUF5QixDQUFDSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUcsUUFBdEMsSUFBa0QsQ0FBQ0osT0FBTyxDQUFDQyxHQUFSLENBQVlJLE9BTHpCO0FBTXhDUixnQkFBQUEsSUFBSSxDQUFDLHdDQUFELENBQUosQ0FOd0M7QUFPakNKLGdCQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVUYsT0FBViw2QkFQaUM7O0FBU3BDWSxnQkFBQUEsR0FUb0MsYUFTM0JOLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxRQVRlLDZCQVNZSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUcsUUFUeEI7O0FBV3RCRyxtREFBUUMsSUFBUixDQUFhRixHQUFiLEVBQWtCO0FBQ2xDRyxvQkFBQUEsTUFBTSxFQUFFLE1BRDBCO0FBRWxDQyxvQkFBQUEsT0FBTyxFQUFFO0FBQ1Asc0NBQWdCLGtCQURUO0FBRVAsNkRBQWdDVixPQUFPLENBQUNDLEdBQVIsQ0FBWUksT0FBNUMsQ0FGTyxFQUZ5Qjs7QUFNbENNLG9CQUFBQSxJQUFJLEVBQUUsRUFBRUMsUUFBUSxFQUFFbEIsT0FBTyxDQUFDbUIsSUFBcEIsRUFONEIsRUFBbEIsQ0FYc0IsVUFXbENDLEdBWGtDOztBQW1CcENBLGdCQUFBQSxHQUFHLENBQUNDLE9BQUosSUFBZUQsR0FBRyxDQUFDQyxPQUFKLENBQVlDLE1BQTNCLElBQXFDRixHQUFHLENBQUNDLE9BQUosQ0FBWSxDQUFaLEVBQWVFLEtBQWYsR0FBdUJsQixTQW5CeEI7QUFvQi9CTixnQkFBQUEsR0FBRyxDQUFDRyxLQUFKLENBQVVGLE9BQVYsRUFBbUJvQixHQUFHLENBQUNDLE9BQUosQ0FBWSxDQUFaLEVBQWVHLE1BQWxDLENBcEIrQjs7QUFzQi9CekIsZ0JBQUFBLEdBQUcsQ0FBQ0csS0FBSixDQUFVRixPQUFWLEVBQW1CRixlQUFuQixDQXRCK0I7OztBQXlCeENDLGdCQUFBQSxHQUFHLENBQUNHLEtBQUosQ0FBVUYsT0FBVjtBQUNBSSxnQkFBQUEsS0FBSyxDQUFDLDJCQUFELGNBQUwsQ0ExQndDLDBFQUE3Qix5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZS1uYXRpdmUnXG5cbmV4cG9ydCBkZWZhdWx0IChsb2dnZXIsIGRlZmF1bHRSZXNwb25zZSkgPT4gYXN5bmMgZnVuY3Rpb24oYm90LCBtZXNzYWdlICkge1xuICBpZiAobWVzc2FnZS5pbnRlbnQpIHJldHVybiBib3QucmVwbHkobWVzc2FnZSwgZGVmYXVsdFJlc3BvbnNlKVxuICBjb25zdCBpbmZvID0gbG9nZ2VyKCdxbmFNYWtlcicsICdpbmZvJylcbiAgY29uc3QgZXJyb3IgPSBsb2dnZXIoJ3FuYU1ha2VyJywgJ2Vycm9yJylcbiAgY29uc3QgdGhyZXNob2xkID0gcHJvY2Vzcy5lbnYuUU5BX1RIUkVTSE9MRCB8fCA3MFxuICBpZiAoIXByb2Nlc3MuZW52LlFOQV9IT1NUIHx8ICFwcm9jZXNzLmVudi5RTkFfS0JJRCB8fCAhcHJvY2Vzcy5lbnYuUU5BX0tFWSkge1xuICAgIGluZm8oJ25vdCB1c2luZyBRTkEgTWFrZXIgYXMgbm8ga2V5IHByb3ZpZGVkJylcbiAgICByZXR1cm4gYm90LnJlcGx5KG1lc3NhZ2UsIGBEaWRuJ3QgY2F0Y2ggdGhhdCwgc29ycnlgKVxuICB9XG4gIGNvbnN0IHVybCA9IGAke3Byb2Nlc3MuZW52LlFOQV9IT1NUfS9rbm93bGVkZ2ViYXNlcy8ke3Byb2Nlc3MuZW52LlFOQV9LQklEfS9nZW5lcmF0ZUFuc3dlcmBcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnBvc3QodXJsLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgRW5kcG9pbnRLZXkgJHtwcm9jZXNzLmVudi5RTkFfS0VZfWBcbiAgICAgIH0sXG4gICAgICBqc29uOiB7IHF1ZXN0aW9uOiBtZXNzYWdlLnRleHQgfVxuICAgIH0pXG4gICAgaWYgKHJlcy5hbnN3ZXJzICYmIHJlcy5hbnN3ZXJzLmxlbmd0aCAmJiByZXMuYW5zd2Vyc1swXS5zY29yZSA+IHRocmVzaG9sZCkge1xuICAgICAgcmV0dXJuIGJvdC5yZXBseShtZXNzYWdlLCByZXMuYW5zd2Vyc1swXS5hbnN3ZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBib3QucmVwbHkobWVzc2FnZSwgZGVmYXVsdFJlc3BvbnNlKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgYm90LnJlcGx5KG1lc3NhZ2UsIGBEaWRuJ3QgY2F0Y2ggdGhhdCwgc29ycnlgKVxuICAgIGVycm9yKCdDb3VsZCBub3QgY2hlY2sgUU5BIE1ha2VyJywgZXJyKVxuICB9XG59XG4iXX0=