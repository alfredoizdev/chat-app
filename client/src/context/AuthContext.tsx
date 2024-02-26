import { createContext, useCallback, useState } from "react";
import { TUser } from "@/lib/types/User";
import { getRequest, postRequest } from "@/lib/services";
import { getFromLocalstorage, saveObjectLocalstorage } from "@/lib/helpers";
import { TChat } from "@/lib/types/Chat";



type ContextState = {
    sendRegisterInfo: (user: TUser) => void;
    setUser: (user: TUser) => void;
    loginUser: (user: TUser) => Promise<void>
    logOut: () => void;
    handleError: () => void;
    setShowList: (showList: "ChatRoom" | "ListUser") => void;
    getListOfUsers: () => void;
    users: TUser[] | null;
    showList: "ChatRoom" | "ListUser";
    user: TUser | null;
    isLoading: boolean;
    error: string | null;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext<ContextState>({
    sendRegisterInfo: () => { },
    loginUser: async () => { },
    setUser: () => { },
    logOut: () => { },
    handleError: () => { },
    setShowList: () => { },
    getListOfUsers: () => { },
    users: null,
    showList: "ChatRoom",
    user: null,
    isLoading: false,
    error: null
});

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<TUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showList, setShowList] = useState<"ChatRoom" | "ListUser">("ChatRoom");
    const [users, setUsers] = useState<TUser[] | null>(null);

    const logOut = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, [])

    const sendRegisterInfo = useCallback(async (user: TUser) => {
        setError(null);
        setIsLoading(true);
        try {

            const response = await postRequest('users/register', user);

            if (response?.error) {
                return setError(response?.message || 'An unknown error occurred');
            }

            saveObjectLocalstorage('user', response);
            setUser(response);


        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginUser = useCallback(async (user: TUser) => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await postRequest('users/login', user);

            if (response?.error) {
                return setError(response?.message || 'An unknown error occurred');
            }

            saveObjectLocalstorage('user', response);
            setUser(response);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getListOfUsers = useCallback(async () => {
        try {
            const response = await getRequest('users');
            if (response?.error) {
                return setError(response?.message || 'An unknown error occurred');
            }

            const user = getFromLocalstorage('user');

            if (user) {
                // Fetch the chat data
                const chatResponse = await getRequest('chats/all');

                if (chatResponse?.error) {
                    return setError(chatResponse?.message || 'An unknown error occurred');
                }

                if (Array.isArray(chatResponse)) {
                    // Extract the member IDs
                    const memberIds = chatResponse.flatMap((chat: TChat) => 'members' in chat ? chat.members : []);

                    if (Array.isArray(response)) {
                        // Filter the users
                        const users = response.filter((u: TUser) => u.id !== user.id && !memberIds.includes(u.id as string));
                        setUsers(users);
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    }, [])


    const handleError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            error,
            showList,
            users,
            getListOfUsers,
            setShowList,
            sendRegisterInfo,
            setUser,
            logOut,
            loginUser,
            handleError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;