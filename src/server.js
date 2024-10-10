// src/server.js
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import * as contactServices from "./services/contact.js";
import { getAllContacts, getContactById } from './services/contact.js';



export const startServer = () => {
    const app = express();
    const port = Number(env('port', '3000'));
    /**/
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use(express.json());

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        console.log('Contacts fetched:', contacts); //test
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });
    /*app.get('/contacts/:contactId', async (req, res, next) => {
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
    });*/
    app.get("/contacts/:contactId", async(req, res)=> {
         const {contactId} = req.params;
         const data = await contactServices.getContactById(contactId);

         if(!data) {
             return res.status(404).json({
                 message: `Contact with id=${contactId} not found`
             });
         }

         res.json({
             status: 200,
             message: `Contact with ${contactId} successfully find`,
             data,
         });
    });
    /**/
    app.use((req, res, next) => {
        console.log(`Time: ${new Date().toLocaleString()}`);
        next();
    });

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world',
        })
    });
    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
        });
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Route not found',
        });
    });
};

