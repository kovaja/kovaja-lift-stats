const AdminService = require('./admin.service');
const ApiHelper = require('../api.helper');

module.exports = class RecordRoute {
  constructor(router) {
    this.service = new AdminService();

    router
      .get('/admin/clear/:key', this.clear.bind(this))
      .get('/admin/exportRecords', this.export.bind(this));

  }

  clear(request, response) {
    ApiHelper.logRequest(request);

    this.service.clear(request.params.key)
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  export(request, response) {
    ApiHelper.logRequest(request);

    this.service.exportRecords()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }
};