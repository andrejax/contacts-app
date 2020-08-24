import { Container } from "typedi";

export default () => {
    const contactModel = {
        name: "ContactModel",
        model: require("./contact").default,
    };
    Container.set(contactModel.name, contactModel.model);

    const userModel = {
        name: "UserModel",
        model: require("./user").default,
    };
    Container.set(userModel.name, userModel.model);
};
