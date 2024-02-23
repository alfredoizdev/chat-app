import { TUser } from "./User";

export type TResponseData = {
    status: string;
    data: TUser;
    error?: boolean;
    message?: string;
}
