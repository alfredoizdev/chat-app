import useAuthContext from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

const Logout = ({ children }: Props) => {

    const { user } = useAuthContext();
    const navigate = useNavigate();



    if (user) return navigate('/');

    return (
        <>
            {children}
        </>
    );
};

export default Logout;