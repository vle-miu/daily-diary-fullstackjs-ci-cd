import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../utils/custom-error";

/**
 * Handle if there is no route
 *
 * @param req
 * @param res
 * @param next
 */
export const notFoundRouteHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(new CustomError(404, "Not found route"));
};
