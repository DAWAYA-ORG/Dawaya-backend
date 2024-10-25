import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsyncError = (Func: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Func(req, res, next).catch(next);
};

export default catchAsyncError;
