import { Request, Response, NextFunction } from 'express';
export const isVerified = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || true) {
    // redirect new otp.
    res.redirect('/new-otp');
    return;
  }
  next();
};
