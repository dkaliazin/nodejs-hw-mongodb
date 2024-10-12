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
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));
contactRouter.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
contactRouter.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
contactRouter.put('/contacts/:contactId',validateBody(createContactSchema), ctrlWrapper(upsertContactController));
contactRouter.patch('/contacts/:contactId',validateBody(createContactSchema), ctrlWrapper(patchContactController));
export default contactRouter;
