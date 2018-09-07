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

  sendError(response, error) {
    let message = 'unknown error';

    if (typeof error === 'string') {
      message = error;
    }

    if (error !== null && typeof error === 'object' && error.message) {
      message = error.message;
    }

    const errorResponse = {
      message: message
    };

    console.error(error);
    response.status(500).send(errorResponse);
  }

  handlePostRequest(handler) {
    const handlerFactory = (request, response) => {
      console.debug('----------POST ' + request.url + ' REQUEST START------------');

      handler(request.body)
        .then(this.sendResponse.bind(this, response))
        .catch(this.sendError.bind(this, response));
    };

    return handlerFactory;
  }

  handlePatchRequest(handler) {
    const handlerFactory = (request, response) => {
      console.debug('----------PATCH ' + request.url + ' REQUEST START------------');

      handler(request.params.id, request.body)
        .then(this.sendResponse.bind(this, response))
        .catch(this.sendError.bind(this, response));
    };

    return handlerFactory;
  }

  handleGetRequest(handler) {
    const handlerFactory = (request, response) => {
      console.debug('----------GET ' + request.url + ' REQUEST START------------');

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
      ['/admin/clearFakeRecords', this.adminService.clearFakeRecords.bind(this.adminService)],
      ['/admin/exportRecords', this.adminService.exportRecords.bind(this.adminService)],
      ['/record/', this.recordService.readRecords.bind(this.recordService)]
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
};