import { ErrorContract } from '.././../domain/contracts/error-contracts';
import ErrorHandler from '../../utils/error-handler';
import { HttpStatusCode } from '../../utils/status-code';

class ErrorsHandler implements ErrorContract {
  errorBadRequest(message: string) {
    return new ErrorHandler(HttpStatusCode.BAD_REQUEST, message);
  }
  errorNotFound(message: string) {
    return new ErrorHandler(HttpStatusCode.NOT_FOUND, message);
  }
  errorUnauthorized(message: string) {
    return new ErrorHandler(HttpStatusCode.UNAUTHORIZED, message);
  }
}

export default ErrorsHandler;
