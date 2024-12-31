import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message.includes('Validation failed')) {
    return res.status(400).send({ message: err.message });
  }
  if ('statusCode' in err && err.statusCode && typeof err.statusCode === 'number') {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
};

export default errorHandler;
