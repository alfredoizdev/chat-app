import { Schema, model, Document } from "mongoose";

export interface IUnread extends Document {
    id: string;
    senderId: string;
    unRead: number;
}

const UnreadSchema = new Schema<IUnread>({
    senderId: {
        type: String,
        required: true,
    },
    unRead: {
        type: Number,
        default: 0,
    },
});

UnreadSchema.virtual('id').get(function (this: IUnread) {
    return this._id.toHexString();
});
UnreadSchema.methods.toJSON = function () {
    const unread = this.toObject();
    delete unread._id;
    delete unread.__v;
    return unread;
};

const Unread = model<IUnread>('Unread', UnreadSchema);
export default Unread;