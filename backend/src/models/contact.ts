import mongoose from "mongoose";
import { IContact } from "../interfaces/IContact";

const Contact = new mongoose.Schema(
  {
    _id : {
      type: String,
      required: [true]
    },

    firstName: {
      type: String,
      required: [true, "Please enter a first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter a last name"],
    },

    email: {
      type: String,
      lowercase: true
    },

    phoneNumber: {
      type: String,
    },

    userId: {
      type: String,
      required: [true],
      index: true
    },
  },

  { timestamps: true },
);

export default mongoose.model<IContact & mongoose.Document>("Contact", Contact);
