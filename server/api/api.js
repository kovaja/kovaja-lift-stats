const GuessService = require('./v1/guess/guess.service');
const LiftService = require('./v1/lift/lift.service');

module.exports = class Api {
  constructor() {
    this.initializeEndpoints();
  }

  initializeEndpoints() {
    this.guessService = new GuessService();
    this.liftService = new LiftService();
  }

  handlePostRequest(handler) {
    const handlerFactory = (request, response) => {

      const sendResponse = (responseData) => {
        console.log('---', request.url, 200, responseData, '---');
        response.status(200).send(responseData);
      };

      const sendError = (errorMessage) => {
        const error = {
          message: errorMessage
        };

        console.log('--',request.url, 500, error, '--');
        response.status(500).send(error);
      }

      console.log('----------POST ' + request.url + ' REQUEST START------------');

      handler(request.body)
        .then(sendResponse)
        .catch(sendError);
    };

    return handlerFactory;
  }

  setPostRoute(router, routeData) {
    router.route(routeData[0]).post(routeData[1]);
  }

  initalizeRouter(express) {
    const router = express.Router();

    const posts = [
      ['/guess', this.handlePostRequest(this.guessService.getGuess.bind(this.guessService))],
      ['/lift', this.handlePostRequest(this.liftService.setLift.bind(this.liftService))]
    ]

    posts.forEach(this.setPostRoute.bind(this, router));
    return router;
  }
}