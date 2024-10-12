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
const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));
contactRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
/*router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));*/
contactRouter.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
/*router.post('/', ctrlWrapper(createContactController));*/
contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
/*router.put('/:contactId',validateBody(createContactSchema), ctrlWrapper(upsertContactController));
router.patch('/:contactId',validateBody(createContactSchema), ctrlWrapper(patchContactController));*/
contactRouter.put('/:contactId',validateBody(createContactSchema), ctrlWrapper(upsertContactController));
contactRouter.patch('/:contactId',validateBody(createContactSchema), ctrlWrapper(patchContactController));

/*router.put('/:contactId',ctrlWrapper(upsertContactController));
router.patch('/:contactId',ctrlWrapper(patchContactController));*/
export default contactRouter;
