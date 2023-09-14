import { ArgumentsHost, Catch } from "@nestjs/common";
import { ZodValidationException } from "nestjs-zod";
import { SocketCallbackData } from "./socket.type";

@Catch()
export class SocketCallbakFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (!this.isValidationException(exception)) {
      return;
    }

    const errorCallback = host.getArgByIndex(2);
    if (typeof errorCallback !== 'function') {
      return;
    }

    const response: SocketCallbackData = {
      status: 'fail',
      data: {
        errors: exception.getZodError().issues,
      }
    }

    errorCallback(response)
  }

  private isValidationException(exception: unknown): exception is ZodValidationException {
    return exception instanceof ZodValidationException;
  }
}