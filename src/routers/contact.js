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
const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId',validateBody(createContactSchema), ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId',validateBody(createContactSchema), ctrlWrapper(patchContactController));
export default router;
