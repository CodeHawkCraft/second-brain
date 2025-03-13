class ApiError extends Error {
  statusCode: number;
  success: boolean;
  constructor(statusCode: number, message = "Internal Server Error") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ApiError;
