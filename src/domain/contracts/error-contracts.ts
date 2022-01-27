export interface ErrorContract {
  errorBadRequest(message: string): Error;
  errorNotFound(message: string): Error;
}
