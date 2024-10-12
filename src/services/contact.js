import { ContactsCollection } from "../db/models/contact.js";
import mongoose from 'mongoose';
//getAllContacts
export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
}
//getContactById
export const getContactById = async (id) => {
    /*if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    try {*/
        const contact = await ContactsCollection.findById(id);
        return contact;
    /*} catch (error) {
        console.error('error trying find contact:', error);
        return null;
    }*/
};
//createContact
export const createContact = async(payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
}
//deleteContact
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, });
    return contact;
}
//updateContact
export const updateContact = async (contactId, payload, options = {}) => {
    const contact = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            /*includeResultMetadata: true,*/
            ...options,
        },
    );
    /*if (!rawResult || !rawResult.value) return null;
    return {
        contact: rawResult.value,
        isNew:Boolean(rawResult?.lastErrorObject?.upserted),
    }*/
    if (!contact) return null;

    return {
        contact: contact,
        isNew: Boolean(options.upsert),
    };
}
