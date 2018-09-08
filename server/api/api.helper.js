const sendErrorFactory = (response) => {
  return (error) => {
    let message = 'unknown error';
    let statusNumber = 500;

    if (typeof error === 'string') {
      message = error;
      statusNumber = 400;
    }

    if (error !== null && typeof error === 'object' && error.message) {
      message = error.message;
    }

    const errorResponse = {
      message: message
    };

    console.error(error);
    response.status(statusNumber).send(errorResponse);
  };
}

const log = (request) => {
  console.debug('-------------REQUEST------------------');
  console.debug(`   > ${request.method}: ${request.url}`);

  if(request.method === 'POST' || request.method === 'PATCH') {
    console.debug(`   > BODY: ${JSON.stringify(request.body)}`);
  }
};

module.exports = {
  errorSender: sendErrorFactory,
  logRequest: log
}