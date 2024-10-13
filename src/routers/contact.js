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
import { updateContact } from "../services/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/multer.js';
const contactRouter = Router();
contactRouter.use(authenticate);
contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/', ctrlWrapper(getContactsController));
contactRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
contactRouter.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
contactRouter.put('/:contactId',upload.single('photo'),validateBody(createContactSchema), ctrlWrapper(upsertContactController));
contactRouter.patch('/:contactId',upload.single('photo'),validateBody(createContactSchema), ctrlWrapper(patchContactController));
contactRouter.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);


export default contactRouter;

