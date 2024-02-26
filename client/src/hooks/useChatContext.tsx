import { useContext, useEffect } from 'react';
import { ChatContext } from '@/context/ChatContext';
import { getRequest } from '@/lib/services';


const useChatContext = () => {
    const {
        createChat,
        setUserChatError,
        setUserChats,
        setIsUserChatLoading,
        updateCurrentChat,
        sendMessage,
        unReadMessages,
        currentChat,
        userChats,
        messages,
        chatWith,
        onlineUsers,
        user,
    } = useContext(ChatContext);

    if (!ChatContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    useEffect(() => {
        const fetchUserChats = async () => {
            setIsUserChatLoading(true);
            try {
                const response = await getRequest(`chats/${user?.id}`);

                if (response.error) {
                    return setUserChatError(response?.message || "An unknown error occurred");
                }

                setUserChats(response);

            } catch (error) {
                console.error('Error fetching user chats', error);
            } finally {
                setIsUserChatLoading(false);
            }

            setTimeout(() => {
                setUserChatError("");
            }, 4000);

        }

        fetchUserChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);



    return {
        createChat,
        updateCurrentChat,
        sendMessage,
        userChats,
        currentChat,
        messages,
        chatWith,
        onlineUsers,
        unReadMessages
    };
};

export default useChatContext;