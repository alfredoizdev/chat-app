import { getRequest, postRequest } from "@/lib/services";
import { TChat, TMessage } from "@/lib/types/Chat";
import { TUser } from "@/lib/types/User";
import { createContext, useCallback, useState } from "react";

type ChatContextType = {
    userChats: TChat[] | null;
    isUserChatLoading: boolean;
    userChatError?: string | null;
    user: TUser | null;
    currentChat: TChat | null;
    messages: TMessage[];
    isMessagesLoading: boolean;
    messageError?: string | null;
    chatWithName: string;
    setUserChatError: (error: string) => void;
    setUserChats: (chats: TChat[]) => void;
    setIsUserChatLoading: (loading: boolean) => void;
    updateCurrentChat: (chat: TChat, chatWithName: string) => void;
    getMessages: (chatId: string) => void;
    createChat: (firstId: string, secondId: string) => void;
    sendMessage: (message: string, senderId: string) => void;

};


export const ChatContext = createContext<ChatContextType>({
    messages: [],
    isMessagesLoading: false,
    messageError: null,
    userChats: null,
    isUserChatLoading: false,
    userChatError: null,
    user: null,
    currentChat: null,
    chatWithName: '',
    setUserChatError: () => { },
    setUserChats: () => { },
    setIsUserChatLoading: () => { },
    updateCurrentChat: () => { },
    getMessages: () => { },
    createChat: () => { },
    sendMessage: () => { }

});

interface ChatProviderProps {
    children: React.ReactNode;
    user: TUser | null;
}


const ChatProvider = ({ children, user }: ChatProviderProps) => {
    const [userChats, setUserChats] = useState<TChat[] | []>([]);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatError, setUserChatError] = useState<string | null>(null);
    const [currentChat, setCurrentChat] = useState<TChat | null>(null);
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messageError, setMessageError] = useState<string | null>(null);
    const [chatWithName, setChatWithName] = useState<string>('');

    const createChat = (firstId: string, secondId: string) => {
        console.log('Creating chat between', firstId, secondId);
    }

    const getMessages = useCallback(async (chatId: string) => {
        setIsMessagesLoading(true);
        try {
            const response = await getRequest(`messages/${chatId}`);
            console.log('Messages', response);
            if (response.error) {
                return setMessageError(response?.message || 'An unknown error occurred');
            }

            setMessages(response);

        } catch (error) {
            if (error instanceof Error) {
                setMessageError(error.message);
            }
        } finally {
            setIsMessagesLoading(false);
        }
    }, []);

    const sendMessage = useCallback(async (message: string, senderId: string | undefined) => {

        setIsMessagesLoading(true);

        if (!message || !currentChat || !senderId) {
            return;
        }

        try {
            const response = await postRequest('messages', { text: message, chatId: currentChat.id, senderId });

            if (response.error) {
                return setMessageError(response?.message || 'An unknown error occurred');
            }

            setMessages((prevMessages) => [...prevMessages, response]);

        } catch (error) {
            if (error instanceof Error) {
                setMessageError(error.message);
            }
        } finally {
            setIsMessagesLoading(false);
        }

    }, [currentChat]);


    const updateCurrentChat = useCallback((chat: TChat, chatWithName: string) => {
        setChatWithName(chatWithName);
        setCurrentChat(chat);
        getMessages(chat.id);
    }, [getMessages]);



    return <ChatContext.Provider value={{
        createChat,
        setUserChatError,
        setUserChats,
        setIsUserChatLoading,
        updateCurrentChat,
        getMessages,
        sendMessage,
        chatWithName,
        isMessagesLoading,
        messages,
        userChats,
        isUserChatLoading,
        userChatError,
        currentChat,
        messageError,
        user
    }}>{children}</ChatContext.Provider>;
}

export default ChatProvider;