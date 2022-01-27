import { HttpStatusCode } from './status-code';

class ErrorHandler extends Error {
  public statusCode: HttpStatusCode;
  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ErrorHandler;
