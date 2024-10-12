import { ContactsCollection } from "../db/models/contact.js";
import mongoose from 'mongoose';
//getAllContacts+
export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
}
//getContactById+
export const getContactById = async (id) => {
   const contacts = await  ContactsCollection.findById(id);
    return contacts;
};
//createContact+
export const createContact = async(payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
}
//deleteContact+
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, });
    return contact;
}
//updateContact+
export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if(!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
}
