import { TChat } from "./Chat";
import { TUser } from "./User";

export type TResponseData = TUser & TChat[] & {
    status: string;
    error?: boolean;
    message?: string;
}
