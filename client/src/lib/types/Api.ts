import { TChat, TMessage } from "./Chat";
import { TUser } from "./User";

export type TResponseData = TUser & TChat[] & TMessage & TMessage[] & {
    status: string;
    error?: boolean;
    message?: string;
}
