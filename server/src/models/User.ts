import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    token?: string | null;
}


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        minLength: 6,
        maxLength: 200,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1500,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

UserSchema.virtual('id').get(function (this: IUser) {
    return this._id.toHexString();
});
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user._id;
    delete user.__v;
    delete user.password;
    return user;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;