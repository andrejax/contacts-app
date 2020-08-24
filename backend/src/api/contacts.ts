import { celebrate, Joi } from "celebrate";
import { NextFunction, Response, Router } from "express";
import jwt from "express-jwt";
import { Container } from "typedi";
import config from "../config";
import { IContact } from "../interfaces/IContact";
import { ITokenRequest } from "../models/tokenRequest";
import ContactsService from "../services/contacts";

const route = Router();

export default (app: Router) => {
    const contactsService = Container.get(ContactsService);

    app.use("/contacts", jwt({
        secret: config.jwtSecret,
        algorithms: ["HS256"],
        userProperty: "token"
    }), route);

    route.get("/", async (req: ITokenRequest, res: Response, next: NextFunction) => {
        try {
            const contacts = await contactsService.ListAll(req.token._id);
            return res.json(contacts).status(200);
        } catch (e) {
            next(e);
        }
    });

    route.get("/:id", async (req: ITokenRequest, res: Response, next: NextFunction) => {
        try {
            const contact = await contactsService.Get(req.params.id, req.token._id);
            return res.json(contact).status(200);
        } catch (e) {
            next(e);
        }
    });

    route.put("/:id",
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                phoneNumber: Joi.string().required(),
            }),
        }),
        async (req: ITokenRequest, res: Response, next: NextFunction) => {
            try {
                const contact = req.body as IContact;
                contact._id = req.params.id;
                await contactsService.Update(contact, req.token._id);
                return res.sendStatus(204);
            } catch (e) {
                next(e);
            }
        });

    route.delete("/:id", async (req: ITokenRequest, res: Response, next: NextFunction) => {
        try {
            await contactsService.Delete(req.params.id, req.token._id);
            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    });

};
