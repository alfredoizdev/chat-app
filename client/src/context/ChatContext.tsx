import { getRequest, postRequest, updateRequest } from "@/lib/services";
import { TChat, TMessage, TNotification, TUnread } from "@/lib/types/Chat";
import { TUser } from "@/lib/types/User";
import { createContext, useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type ChatContextType = {
    userChats: TChat[] | null;
    isUserChatLoading: boolean;
    userChatError?: string | null;
    user: TUser | null;
    currentChat: TChat | null;
    messages: TMessage[];
    isMessagesLoading: boolean;
    messageError?: string | null;
    chatWith: TUser | null;
    socket: Socket | null;
    onlineUsers: string[];
    unReadMessages: TUnread[];
    setCurrentChat: (chat: TChat | null) => void;
    setUserChatError: (error: string) => void;
    setUserChats: (chats: TChat[]) => void;
    setIsUserChatLoading: (loading: boolean) => void;
    updateCurrentChat: (chat: TChat, chatWith: TUser) => void;
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
    chatWith: null,
    socket: null,
    onlineUsers: [],
    unReadMessages: [],
    setCurrentChat: () => { },
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
    const [chatWith, setChatWith] = useState<TUser | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [unReadMessages, setUnReadMessages] = useState<TUnread[]>([]);


    const createChat = async (firstId: string, secondId: string) => {
        try {
            const response = await postRequest('chats', { firstId, secondId });
            if (response.error) {
                return setUserChatError(response?.message || 'An unknown error occurred');
            }

        } catch (error) {
            if (error instanceof Error) {
                setUserChatError(error.message);
            }
        }
    };

    const getMessages = useCallback(async (chatId: string) => {
        setIsMessagesLoading(true);
        try {
            const response = await getRequest(`messages/${chatId}`);
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

            socket?.emit('sendMessage', response, chatWith?.id);
            setMessages((prevMessages) => [...prevMessages, response]);

        } catch (error) {
            if (error instanceof Error) {
                setMessageError(error.message);
            }
        } finally {
            setIsMessagesLoading(false);
        }

    }, [currentChat, socket, chatWith]);


    const updateCurrentChat = useCallback((chat: TChat, chatWith: TUser) => {
        setChatWith(chatWith);
        setCurrentChat(chat);
        getMessages(chat.id);
    }, [getMessages]);


    const handleUpdateUnreadMessages = useCallback(async (senderId: string) => {
        try {
            const response = await updateRequest(`chats/unread/`, { senderId });

            if (response.error) {
                return setMessageError(response?.message || 'An unknown error occurred');
            }
        } catch (error) {
            console.error('Failed to update unread messages:', error);
        }
    }, []); // Add dependencies here if any


    useEffect(() => {
        if (!user) {
            return;
        }

        const getALlUnreadMessages = async () => {
            try {
                const response = await getRequest('chats/unread/all');
                if (response.error) {
                    return setMessageError(response?.message || 'An unknown error occurred');
                }
                setUnReadMessages(response);

            } catch (error) {
                if (error instanceof Error) {
                    setMessageError(error.message);
                }
            }
        };

        const onGetOnlineUserIds = (users: TUser[]) => {
            const userIds = users.map(user => user.id).filter((id): id is string => id !== undefined);
            const newOnlineUsers = [...onlineUsers];
            userIds.forEach(id => {
                if (!newOnlineUsers.includes(id)) {
                    newOnlineUsers.push(id);
                }
            });
            setOnlineUsers(newOnlineUsers);
        };
        const onUserDisconnect = (users: TUser[]) => {
            const userIds = users.map(user => user.id).filter((id): id is string => id !== undefined);
            setOnlineUsers(userIds);
        };

        const onGetNotification = async (notification: TNotification) => {
            try {
                const response = await getRequest(`chats/unread/${notification.senderId}`);
                if (response?.error) {
                    return setMessageError(response?.message || 'An unknown error occurred');
                }

                const chatOpen = currentChat?.members.includes(notification.senderId);

                if (!chatOpen) {
                    setUnReadMessages(prev => {
                        const updatedMessages = prev.map(msg =>
                            msg.senderId === response.senderId ? { ...msg, unRead: response.unRead } : msg
                        );

                        if (!updatedMessages.find(msg => msg.senderId === response.senderId)) {
                            updatedMessages.push(response);
                        }

                        return updatedMessages;
                    });
                } else {
                    try {
                        await handleUpdateUnreadMessages(notification.senderId);
                    } catch (error) {
                        console.error('Failed to update unread messages:', error);
                    }
                }

            } catch (error) {
                if (error instanceof Error) {
                    console.error('Failed to get unread messages:', error);
                }
            }
        };

        const socket = io('http://localhost:4000', { transports: ['websocket'] });

        if (socket && user) {
            socket.emit('addNewUser', user.id);
            socket.on('onlineUsers', onGetOnlineUserIds);
            socket.on('disconnect onlineUsers', onUserDisconnect);
            socket.on('newMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
            socket.on('newNotification', onGetNotification);
        }

        getALlUnreadMessages();

        setSocket(socket);

        const updateUnreadMessages = async () => {

            const senderId = currentChat?.members.find(id => id !== user.id) || "";
            await handleUpdateUnreadMessages(senderId);
            const unread = unReadMessages.map(msg => msg.senderId === senderId ? { ...msg, unRead: 0 } : msg);
            setUnReadMessages(unread);
        };

        if (currentChat) {
            updateUnreadMessages();
        }

        return () => {
            socket.disconnect();
            socket.off('onlineUsers', onGetOnlineUserIds);
            socket.off('disconnect onlineUsers', onUserDisconnect);
            socket.off('newMessage');
            socket.off('newNotification', onGetNotification);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, currentChat]);





    return <ChatContext.Provider value={{
        createChat,
        setUserChatError,
        setUserChats,
        setIsUserChatLoading,
        updateCurrentChat,
        getMessages,
        sendMessage,
        setCurrentChat,
        socket,
        chatWith,
        isMessagesLoading,
        messages,
        userChats,
        isUserChatLoading,
        userChatError,
        currentChat,
        messageError,
        onlineUsers,
        unReadMessages,
        user
    }}>{children}</ChatContext.Provider>;
}

export default ChatProvider;