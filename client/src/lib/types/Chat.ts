export type TChat = {
    members: string[];
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface TMessage {
    chatId: string;
    senderId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}