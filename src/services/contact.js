import { ContactsCollection } from "../db/models/contact.js";
import mongoose from 'mongoose';
export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
}
/*export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(new ObjectId(contactId));
    return contact;
}*/
export const getContactById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    try {
        const contact = await ContactsCollection.findById(id);
        return contact;
    } catch (error) {
        console.error('error trying find contact:', error);
        return null;
    }
};
