import { Router } from "express";
import { getAllContacts, getContactById } from './services/contact.js';
const router = Router();
    router.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        console.log('Contacts fetched:', contacts); //test
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });
    router.get('contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            res.status(404).json({
                message: 'contact wasnt found'
            });
            res.status(200).json({
                status: 200,
                message: 'Successfully found contacts!',
                data: contact,
            });
        };
    });
export default router;
