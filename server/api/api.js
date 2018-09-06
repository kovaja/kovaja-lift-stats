const RecordService = require('./v1/record/record.service');
const AdminService = require('./v1/admin/admin.service');

module.exports = class Api {
  constructor() {
    this.initializeEndpoints();
  }

  initializeEndpoints() {
    this.recordService = new RecordService();
    this.adminService = new AdminService();
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

  handleGetRequest(handler) {
    const handlerFactory = (request, response) => {
      console.log('----------GET ' + request.url + ' REQUEST START------------');

      handler()
        .then(this.sendResponse.bind(this, response))
        .catch(this.sendError.bind(this, response));
    };

    return handlerFactory;
  }

  setPostRoute(router, routeData) {
    const handler = this.handlePostRequest(routeData[1]);

    router.route(routeData[0]).post(handler);
  }

  setPatchRoute(router, routeData) {
    const handler = this.handlePatchRequest(routeData[1]);

    router.route(routeData[0]).patch(handler);
  }

  setGetRoute(router, routeData) {
    const handler = this.handleGetRequest(routeData[1]);

    router.route(routeData[0]).get(handler);
  }

  initalizeRouter(express) {
    const router = express.Router();

    const gets = [
      ['/admin/clearFakeRecords', this.adminService.clearFakeRecords.bind(this.adminService)]
    ];

    const posts = [
      ['/record', this.recordService.createRecord.bind(this.recordService)]
    ];

    const patches = [
      ['/record/:id', this.recordService.patchRecord.bind(this.recordService)]
    ];

    gets.forEach(this.setGetRoute.bind(this, router));
    posts.forEach(this.setPostRoute.bind(this, router));
    patches.forEach(this.setPatchRoute.bind(this, router));

    return router;
  }
}