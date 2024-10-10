import { model, Schema } from 'mongoose';
/*
name - string, required
phoneNumber - string, required
email - string
isFavourite - boolean, default false
contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’
*/
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
            requred:true,
        },
        contactType: {
            type: String,
            enum: ['personal', 'home'],
            required: true,
        },
    },
    {
    timestamps: true,
    versionKey: false,
  },
);
export const ContactsCollection = model('contacts', contactSchema);
