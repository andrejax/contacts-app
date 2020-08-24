import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Document, Model } from "mongoose";
import { Inject, Service } from "typedi";
import config from "../config";
import { IUser } from "../interfaces/IUser";

@Service()
export default class AuthService {
    private readonly jwtSecret: string = config.jwtSecret;

    constructor(@Inject("UserModel") private userModel: Model<IUser & Document>) { }

    public async SignUp(username: string, password: string) {
        const hashedPassword = await argon2.hash(password);
        const userRecord = await this.userModel.create({
            username,
            password: hashedPassword,
        });

        if (!userRecord) {
            throw new Error("User cannot be created");
        }
    }

    public async LogIn(username: string, password: string): Promise<string> {
        const userRecord = await this.userModel.findOne({ username });
        if (!userRecord) {
            throw new Error("User not registered");
        }
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            const token = this.generateToken(userRecord);
            return token;
        } else {
            throw new Error("Invalid Password");
        }
    }

    private generateToken(user: IUser) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign(
            {
                _id: user._id,
                name: user.username,
                exp: exp.getTime() / 1000,
            },
            this.jwtSecret,
        );
    }
}
