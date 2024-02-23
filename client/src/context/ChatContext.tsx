import { TChat } from "@/lib/types/Chat";
import { TUser } from "@/lib/types/User";
import { createContext, useState } from "react";

type ChatContextType = {
    createChat: (firstId: string, secondId: string) => void;
    userChats: TChat[] | null;
    isUserChatLoading: boolean;
    userChatError?: string | null;
    user: TUser | null;
    setUserChatError: (error: string) => void;
    setUserChats: (chats: TChat[]) => void;
    setIsUserChatLoading: (loading: boolean) => void;
};


export const ChatContext = createContext<ChatContextType>({
    createChat: () => { },
    userChats: null,
    isUserChatLoading: false,
    userChatError: null,
    user: null,
    setUserChatError: () => { },
    setUserChats: () => { },
    setIsUserChatLoading: () => { }

});

interface ChatProviderProps {
    children: React.ReactNode;
    user: TUser | null;
}


const ChatProvider = ({ children, user }: ChatProviderProps) => {
    const [userChats, setUserChats] = useState<TChat[] | []>([]);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatError, setUserChatError] = useState<string | null>(null);

    const createChat = (firstId: string, secondId: string) => {
        console.log('Creating chat between', firstId, secondId);
    }

    return <ChatContext.Provider value={{
        createChat,
        setUserChatError,
        setUserChats,
        setIsUserChatLoading,
        userChats,
        isUserChatLoading,
        userChatError,
        user
    }}>{children}</ChatContext.Provider>;
}

export default ChatProvider;