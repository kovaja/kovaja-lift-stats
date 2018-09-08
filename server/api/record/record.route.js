const RecordService = require('./record.service');
const ApiHelper = require('../api.helper');

module.exports = class RecordRoute {
  constructor(router) {
    this.service = new RecordService();

    router
      .get('/record', this.readAll.bind(this))
      .post('/record', this.create.bind(this))
      .patch('/record/:id', this.patch.bind(this));

  }

  readAll(request, response) {
    ApiHelper.logRequest(request);

    this.service.readRecords()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response))
  }

  create(request, response) {
    ApiHelper.logRequest(request);

    this.service.createRecord(request.body)
      .then(responseData => response.status(201).send(responseData))
      .catch(ApiHelper.errorSender(response))
  }

  patch(request, response) {
    ApiHelper.logRequest(request);

    this.service.patchRecord(request.params.id, request.body)
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response))
  }
};