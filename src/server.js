// src/server.js
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { env } from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';
import { getAllContacts, getContactById } from './services/contact.js';
dotenv.config();


export const startServer = () => {
    const app = express();
    const port = Number(env('port', '3000'));
/**/

/*app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
        data:students,
    })
});
app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);
    if (!student) {
        req.status(404).json({
            message: 'student wasnt found'
        });
        return;
    }
    res.status(200).json({
        data:student,
    })
});*/
app.use(cors());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
     console.log('Contacts fetched:', contacts); //test
    res.status(200).json({
        data:contacts,
    })
})
app.get('contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
        req.status(404).json({
            message: 'contact wasnt found'
        });
        res.status(200).json({
        data:contact,
    })
    }
})
app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
})
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world',
    })
})
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
  });
});
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});
}

