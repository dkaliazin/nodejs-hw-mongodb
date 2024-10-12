import { Router } from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController
} from "../controllers/contact.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
contactsRouter.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
contactsRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
export default contactsRouter;
