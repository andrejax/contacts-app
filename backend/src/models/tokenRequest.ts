import { Request } from "express";

export interface ITokenRequest extends Request {
    token: {
        _id: string;
    };
}
