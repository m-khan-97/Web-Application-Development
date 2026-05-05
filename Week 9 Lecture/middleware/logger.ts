import { Request, Response } from "express";

export default function logger(req: Request, res: Response, next: () => void) {
    console.log(`Request received for ${req.originalUrl}`);
    next();
}