import { NextFunction, Response, Request } from "express";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const user = (req as any).user

    if (user && user.role === "admin") {
        next()
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied."
        });
    }
};

module.exports = { isAdmin };