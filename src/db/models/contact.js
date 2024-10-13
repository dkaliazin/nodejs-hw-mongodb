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
            required: function() {return this.isNew; },
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
            default: 'personal',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        photo: { type: String },
    },
    {
    timestamps: true,
    versionKey: false,
  },
);
export const ContactsCollection = model('contacts', contactSchema);
