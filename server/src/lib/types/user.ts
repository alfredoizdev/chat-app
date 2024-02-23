import { type } from "os";

export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: string | null;
    updatedA?: string | null;
    token?: string | null;
};