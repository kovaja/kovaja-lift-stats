const RecordService = require('./v1/record/record.service');

module.exports = class Api {
  constructor() {
    this.initializeEndpoints();
  }

  initializeEndpoints() {
    this.recordService = new RecordService();
  }

  sendResponse(response, responseData) {
    response.status(200).send(responseData);
  }

  sendError(response, errorMessage) {
    const error = {
      message: errorMessage
    };

    response.status(500).send(error);
  }

  handlePostRequest(handler) {
    const handlerFactory = (request, response) => {
      console.log('----------POST ' + request.url + ' REQUEST START------------');

      handler(request.body)
        .then(this.sendResponse.bind(this, response))
        .catch(this.sendError.bind(this, response));
    };

    return handlerFactory;
  }

  handlePatchRequest(handler) {
    const handlerFactory = (request, response) => {
      console.log('----------PATCH ' + request.url + ' REQUEST START------------');

      handler(request.params.id, request.body)
        .then(this.sendResponse.bind(this, response))
        .catch(this.sendError.bind(this, response));
    };

    return handlerFactory;
  }

  setPostRoute(router, routeData) {
    router.route(routeData[0]).post(routeData[1]);
  }

  setPatchRoute(router, routeData) {
    router.route(routeData[0]).patch(routeData[1]);
  }

  initalizeRouter(express) {
    const router = express.Router();

    const posts = [
      ['/record', this.handlePostRequest(this.recordService.createRecord.bind(this.recordService))]
    ]

    const patches = [
      ['/record/:id', this.handlePatchRequest(this.recordService.patchRecord.bind(this.recordService))]
    ]

    posts.forEach(this.setPostRoute.bind(this, router));
    patches.forEach(this.setPatchRoute.bind(this, router));
    return router;
  }
}