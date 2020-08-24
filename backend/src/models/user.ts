import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const User = new mongoose.Schema(
  {
    password: {
        type: String,
    },

    username: {
        type: String,
        unique: true,
    },
  },

  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>("UserAccount", User);
