import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt?: string | null;
    updatedAt?: string | null;
};

const MessageSchema = new Schema({
    chatId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

MessageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

MessageSchema.methods.toJSON = function () {
    const message = this.toObject();
    delete message._id;
    delete message.__v;
    return message;
};

const Message = model<IMessage>('Message', MessageSchema);

export default Message;