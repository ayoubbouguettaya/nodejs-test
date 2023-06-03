
import { Catch, ConflictException, HttpException, NotFoundException } from '@nestjs/common';

@Catch(HttpException,ConflictException,NotFoundException)
export class HttpExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.response.message
  
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message
      });
  }
}
