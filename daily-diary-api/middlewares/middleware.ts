import morgan from "morgan";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";

/**
 * Config to log all the requests information
 */
export const logRequest = morgan("dev");

/**
 * Handle all the server errors
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const errorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
    } else {
        res.status(500).json({ error: error.message });
    }
};
