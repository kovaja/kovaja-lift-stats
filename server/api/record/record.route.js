const RecordService = require('./record.service');
const RecordValidator = require('./record.validatior');
const ApiHelper = require('../api.helper');

const API_NAME = 'record';

module.exports = class RecordRoute {
  constructor(router) {
    this.service = new RecordService();

    router
      .get(`/${API_NAME}`, this.readAll.bind(this))
      .post(`/${API_NAME}`, this.create.bind(this))
      .patch(`/${API_NAME}/:id`, this.patch.bind(this));
  }

  readAll(request, response) {
    ApiHelper.logRequest(request);

    this.service.readRecords()
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  create(request, response) {
    ApiHelper.logRequest(request);

    const model = request.body;
    const validationError = RecordValidator.validateCreatePayload(model);

    if (validationError) {
      return Promise.reject(validationError).catch(ApiHelper.errorSender(response));
    }

    this.service.createRecord(model)
      .then(responseData => response.status(201).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }

  patch(request, response) {
    ApiHelper.logRequest(request);

    const partialModel = request.body;
    const validationError = RecordValidator.validatePatchPayload(partialModel)

    if (validationError) {
      return Promise.reject(validationError).catch(ApiHelper.errorSender(response));
    }

    this.service.patchRecord(request.params.id, partialModel)
      .then(responseData => response.status(200).send(responseData))
      .catch(ApiHelper.errorSender(response));
  }
};