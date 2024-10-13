import { createContact, getAllContacts, getContactById, updateContact, deleteContact,} from "../services/contact.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
//getAllContacts
export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const { _id: userId } = req.user;

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data,
  });
};
//getContactById
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById(contactId , userId);

    if (!data) {
      throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data,
    });
};
//createContact
export const createContactController = async (req, res) => {
  const contact = await createContact({...req.body,  userId: req.user._id,});
  res.status(200).json({
    status: 201,
    message: `Successfully created a contact`,
    data: contact,
  })
}
//deleteContact
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, 'contact not found'));
    return;
  }
  res.status(204).send();
}
//upsertContact
export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await updateContact(
    { _id: id, userId },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully created a contact!`,
    data,
  });
};

//patchContact
export const patchContactController = async (req, res) => {

    const { contactId } = req.params;
    const result = await updateContact({_id: contactId }, req.body);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact',
      data: result,
    });

};
