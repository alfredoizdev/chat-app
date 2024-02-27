import { TChat, TMessage, TUnread } from "./Chat";
import { TUser } from "./User";

export type TResponseData = TUser
    & TUser[]
    & TChat[]
    & TChat
    & TMessage
    & TMessage[]
    & TUnread[]
    & TUnread
    & {
        status: string;
        error?: boolean;
        message?: string;
    }
