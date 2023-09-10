export class ErrorClass extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode || 500;
  }
}
