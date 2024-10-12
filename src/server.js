// src/server.js
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contact.js';
import contactsRouter from './routers/contact.js';
import * as contactServices from "./services/contact.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
dotenv.config();


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
    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json'],
        limit:'100kb',
    }));

    app.use((req, res, next) => {
        console.log(`Time: ${new Date().toLocaleString()}`);
        next();
    });

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world',
        })
    });
    //routers
    app.use('/contacts',contactsRouter); //router
    app.use('*', notFoundHandler);
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })

};

