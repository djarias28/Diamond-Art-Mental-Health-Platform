class ErrorResponse extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }

    this.name = this.constructor.name;
  }
}

export default ErrorResponse;
