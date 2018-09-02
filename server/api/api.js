const Guess = require('./v1/guess/guess.service');

module.exports = class Api {
  constructor() {
    this.initializeEndpoints();
  }

  initializeEndpoints() {
    this.guess = new Guess();
  }

  handlePostRequest(handler) {
    const handlerFactory = (request, response) => {

      const sendResponse = (responseData) => {
        console.log(request.url, 200, responseData);
        response.status(200).send(responseData);
      };

      const sendError = (errorMessage) => {
        const error = {
          message: errorMessage
        };

        console.log(request.url, 500, error);
        response.status(500).send(error);
      }

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
      ['/guess', this.handlePostRequest(this.guess.getGuess.bind(this.guess))]
    ]

    posts.forEach(this.setPostRoute.bind(this, router));
    return router;
  }
}