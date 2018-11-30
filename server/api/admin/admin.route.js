const AdminService = require('./admin.service');
const ApiHelper = require('../api.helper');

module.exports = class RecordRoute {
  constructor(router) {
    this.service = new AdminService();

    router
      .get('/admin/clear/:key', this.clear.bind(this))
      .get('/admin/exportRecords', this.exportRecords.bind(this))
      .get('/admin/customUpdate', this.customUpdate.bind(this))
      .get('/admin/initializeWeights', this.initializeWeights.bind(this))
      .get('/admin/tryWeights', this.tryWeights.bind(this));

  }

  clear(request, response) {
    ApiHelper.logRequest(request);

    this.service.clearData(request.params.key)
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  exportRecords(request, response) {
    ApiHelper.logRequest(request);

    this.service.exportRecords()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  customUpdate(request, response) {
    ApiHelper.logRequest(request);

    this.service.customUpdate()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  initializeWeights(request, response) {
    ApiHelper.logRequest(request);

    this.service.initializeWeights()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  tryWeights(request, response) {
    ApiHelper.logRequest(request);

    this.service.tryWeights()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }
};