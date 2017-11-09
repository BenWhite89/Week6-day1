import { Request, Response, NextFunction, } from 'express';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        next();
    } else {
        console.log(req.body);
        res.sendStatus(401);
    }
}