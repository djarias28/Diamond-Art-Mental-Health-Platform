import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wrap async/await functions in this to handle errors properly
 * @param fn The async function to wrap
 * @returns A function that handles errors properly
 */
const asyncHandler = (fn: RequestHandler) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
