const ClientError = require('./ClientError');

class NotFountError extends ClientError {
  constructor(messsage) {
    super(messsage, 404);
    this.name = 'NotFountError';
  }
}

module.exports = NotFountError;
