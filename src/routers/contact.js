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
import { createContactSchema,  } from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));
contactRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
/*contactRouter.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));*/
contactRouter.post('/', ctrlWrapper(createContactController));
contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
/*contactRouter.put('/contacts/:contactId',validateBody(createContactSchema), ctrlWrapper(upsertContactController));
contactRouter.patch('/contacts/:contactId', validateBody(createContactSchema), ctrlWrapper(patchContactController));*/
contactRouter.put('/:contactId',ctrlWrapper(upsertContactController));
contactRouter.patch('/:contactId',ctrlWrapper(patchContactController));
contactRouter.use(authenticate);

export default contactRouter;
