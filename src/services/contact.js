import { ContactsCollection } from "../db/models/contact.js";
import mongoose from 'mongoose';
import { calculationPaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
//getAllContacts
export const getAllContacts = async ({ page, perPage,sortOrder = SORT_ORDER.ASC, sortBy = '_id',userId,}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find({ userId })
    const contactsCount = await ContactsCollection
        .find({ userId })
        .merge(contactsQuery)
        .countDocuments();
    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec();
    const paginationData = calculationPaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
}
//getContactById
export const getContactById = async (id, userId,) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    try {
        const contact = await ContactsCollection.findById({ _id: id, userId });
        return contact;
    } catch (error) {
        console.error('error trying find contact:', error);
        return null;
    }
};
//createContact
export const createContact = async(payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
}
//deleteContact
export const deleteContact = async (contactId, userId,) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
    return contact;
}
//updateContact
export const updateContact = async (contactId, userId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId,},
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return rawResult.value;
};
