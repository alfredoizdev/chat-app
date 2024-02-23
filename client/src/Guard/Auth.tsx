import useAuthContext from "@/hooks/useAuthContext";
import Login from "@/pages/Login";

type Props = {
    children: React.ReactNode;
};

const Auth = ({ children }: Props) => {

    const { user } = useAuthContext();

    if (!user) return <Login />

    return (
        <>
            {children}
        </>
    );
};

export default Auth;