import { ErrorInterceptor } from '../error.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let consoleSpy: jest.SpyInstance;

  const mockRequest = {
    method: 'GET',
    url: '/test',
  };

  const mockExecutionContext: Partial<ExecutionContext> = {
    switchToHttp: () => ({
      getRequest: () => mockRequest,
    }),
  };

  beforeEach(() => {
    interceptor = new ErrorInterceptor();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should pass successful values through unchanged', (done) => {
    const responseData = { ok: true };

    const mockHandler: CallHandler = {
      handle: () => of(responseData),
    };

    const result$ = interceptor.intercept(
      mockExecutionContext as ExecutionContext,
      mockHandler,
    );

    result$.subscribe((result) => {
      expect(result).toEqual(responseData);
      expect(consoleSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it('should log error and rethrow it', (done) => {
    const testError = new Error('Something failed');

    const mockHandler: CallHandler = {
      handle: () => throwError(() => testError),
    };

    const result$ = interceptor.intercept(
      mockExecutionContext as ExecutionContext,
      mockHandler,
    );

    result$.subscribe({
      next: () => {
        done('Should not emit next value when error occurs');
      },
      error: (err) => {
        // The same error should be rethrown
        expect(err).toBe(testError);

        // Ensure logging happened
        expect(consoleSpy).toHaveBeenCalledWith(
          `API::RESPONSE::ERROR:: [GET /test]`,
          expect.objectContaining({
            error_message: testError.message,
            stack: testError.stack || 'No stack trace available',
          }),
        );

        done();
      },
    });
  });
});
