import {
  BadRequestException,
  CallHandler,
  ExecutionContext, ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AuthenticationError,
  AuthorizationError, ForbiddenError,
  OperationNotAllowedError,
  ResourceNotFoundError,
} from './errors';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle()
      .pipe(catchError(error => {
        if (error instanceof ResourceNotFoundError) {
          throw new NotFoundException(error.message);
        } else if (error instanceof OperationNotAllowedError) {
          throw new BadRequestException(error.message);
        } else if (error instanceof AuthenticationError) {
          throw new NotFoundException(error.message);
        } else if (error instanceof AuthorizationError) {
          throw new NotFoundException(error.message);
        } else if (error instanceof ForbiddenError) {
          throw new ForbiddenException(error.message);
        } else {
          error.message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message;
          throw error;
        }
      }));
  }
}
