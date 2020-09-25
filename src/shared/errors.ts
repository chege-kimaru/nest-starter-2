class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class OperationNotAllowedError extends BaseError {
  constructor(message) {
    super(message);
    this.message = message || 'Invalid operation';
  }
}

export class AuthenticationError extends BaseError {
  constructor(message) {
    super(message);
    this.message = message || 'Authentication failed. Please try again';
  }
}

export class AuthorizationError extends BaseError {
  constructor(message) {
    super(message);
    this.message = message || 'Authorization failed.';
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this.message = message || 'Resource not found';
  }
}

export class ForbiddenError extends BaseError {
  constructor(message) {
    super(message);
    this.message = message || 'Forbidden to access resource';
  }
}
