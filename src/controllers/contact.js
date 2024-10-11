import { getAllContacts, getContactById } from "../services/contact.js";
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  }
  catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next,) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'contact not found');
  }
  // Відповідь, якщо контакт знайдено
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
