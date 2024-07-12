import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Add new diary by Date
 *
 * @param req
 * @param res
 * @param next
 */
export const addDiaryHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

/**
 * Get all diaries by Date
 *
 * @param req
 * @param res
 * @param next
 */
export const getAllDiaryHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

/**
 * Get diary by Date and Id
 *
 * @param req
 * @param res
 * @param next
 */
export const getDiaryByIdHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

/**
 * Voted diary by Date and Id
 *
 * @param req
 * @param res
 * @param next
 */
export const updateDiaryVoteHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};
