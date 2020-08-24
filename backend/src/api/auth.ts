import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { IUser } from "../interfaces/IUser";
import AuthService from "../services/auth";

const route = Router();

export default (app: Router) => {

    const contactsService = Container.get(AuthService);

    app.use("/", route);

    route.post("/login",
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = req.body as IUser;
                const token = await contactsService.LogIn(user.username, user.password);
                return res.json({ token }).status(200);
            } catch (e) {
                return next(e);
            }
        });

    route.post("/register",
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = req.body as IUser;
                await contactsService.SignUp(user.username, user.password);
                return res.sendStatus(204);
            } catch (e) {
                if (e.code === 11000) {
                    return res.status(400).send({ message : "Username already exist"});
                }
                return next(e);
            }
        });
};
