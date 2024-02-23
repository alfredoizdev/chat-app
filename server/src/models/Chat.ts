import mongoose, { Schema } from 'mongoose';


const ChatSchema = new Schema({
    members: Array,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ChatSchema.virtual('id').get(function (this) {
    return this._id.toHexString();
});

ChatSchema.methods.toJSON = function () {
    const chat = this.toObject();
    delete chat._id;
    delete chat.__v;
    return chat;
};

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;