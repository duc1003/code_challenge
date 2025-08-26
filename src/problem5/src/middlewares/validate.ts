import { Request, Response, NextFunction } from "express";

export function validate(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of requiredFields) {
      if (!(req.body as any)[field]) {
        return res.status(400).json({
          message: `Missing required field: ${field}`,
        });
      }
    }
    next();
  };
}
