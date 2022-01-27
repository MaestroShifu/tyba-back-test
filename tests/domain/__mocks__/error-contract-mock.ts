import { ErrorContract } from '../../../src/domain/contracts/error-contracts';

const messageMock = jest.fn((message) => new Error(message));

const errorContractMock: ErrorContract = {
  errorBadRequest: messageMock,
  errorNotFound: messageMock
};

export default errorContractMock;
