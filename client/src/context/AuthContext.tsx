import { createContext, useCallback, useState } from "react";
import { TUser } from "@/lib/types/User";
import { postRequest } from "@/lib/services";
import { saveObjectLocalstorage } from "@/lib/helpers";



type ContextState = {
    sendRegisterInfo: (user: TUser) => void;
    setUser: (user: TUser) => void;
    loginUser: (user: TUser) => Promise<void>
    logOut: () => void;
    handleError: () => void;
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
    user: null,
    isLoading: false,
    error: null
});

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<TUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            setUser(response.data);

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
            setUser(response.data);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            error,
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