import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getFromLocalstorage } from '@/lib/helpers';

const useAuthContext = () => {
    const {
        error,
        isLoading,
        user,
        sendRegisterInfo,
        setUser,
        logOut,
        loginUser,
        handleError
    } = useContext(AuthContext);

    if (!AuthContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    useEffect(() => {

        if (!user) {
            const curretnUser = getFromLocalstorage('user') || null;
            setUser(curretnUser);
        }

        setTimeout(() => {
            handleError();
        }, 4000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return { sendRegisterInfo, error, isLoading, user, logOut, loginUser };
};

export default useAuthContext;