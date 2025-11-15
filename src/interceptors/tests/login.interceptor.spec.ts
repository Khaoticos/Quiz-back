import { LoginInterceptor } from '../login.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('LogingInterceptor', () => {
  let interceptor: LoginInterceptor;

  const mockRequest = {
    method: 'GET',
    url: '/test',
    body: { name: 'John' },
    query: { search: 'abc' },
    params: { id: '1' },
  };

  const mockExecutionContext: Partial<ExecutionContext> = {
    switchToHttp: () => ({
      getRequest: () => mockRequest,
    }),
  };

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    interceptor = new LoginInterceptor();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log request and response', (done) => {
    const responseData = { success: true };

    const mockCallHandler: CallHandler = {
      handle: () => of(responseData),
    };

    const result$ = interceptor.intercept(
      mockExecutionContext as ExecutionContext,
      mockCallHandler,
    );

    result$.subscribe((result) => {
      // Result should pass through correctly
      expect(result).toEqual(responseData);

      // Check request log
      expect(consoleSpy).toHaveBeenCalledWith(`API::REQUEST:: [GET /test]`, {
        params: mockRequest.params,
        query: mockRequest.query,
        body: mockRequest.body,
      });

      // Check response log
      expect(consoleSpy).toHaveBeenCalledWith(
        `API::RESPONSE:: [GET /test]`,
        expect.objectContaining({
          response: responseData,
          time: expect.any(Number),
        }),
      );

      done();
    });
  });
});
