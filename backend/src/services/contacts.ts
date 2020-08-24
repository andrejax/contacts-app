import { Document, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { IContact } from "../interfaces/IContact";

@Service()
export default class ContactsService {

    constructor(@Inject("ContactModel") private contactModel: Model<IContact & Document>) {
    }

    public async ListAll(userId: string): Promise<IContact[]> {
        return this.contactModel.find({ userId });
    }

    public async Get(id: string, userId: string): Promise<IContact> {
        const contactRecord = await this.contactModel.findOne({ _id: id, userId });
        if (!contactRecord) {
            throw new Error("Contact not found");
        }
        return contactRecord;
    }

    public Update(contact: IContact, userId: string) {
        return this.contactModel.updateOne({ _id: contact._id, userId }, contact, { upsert: true });
    }

    public Delete(id: string, userId: string) {
        return this.contactModel.deleteOne({ _id: id, userId });
    }
}
