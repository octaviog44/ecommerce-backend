import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getProfile = (req: AuthRequest, res: Response) => {
    res.json(req.user);
};

export const updateProfile = (req: AuthRequest, res: Response) => {
    Object.assign(req.user, req.body);
    res.json(req.user);
};

export const updateAddress = (req: AuthRequest, res: Response) => {
    req.user.address = { ...req.user.address, ...req.body };
    res.json(req.user.address);
};
