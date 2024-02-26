import { useEffect, useState } from "react";
import { getRequest } from "@/lib/services";
import { TUser } from "@/lib/types/User";
// import { TChat } from "@/lib/types/Chat";
// import { getFromLocalstorage } from "@/lib/helpers";

const useFecthResipientUser = (recipientId: string) => {
    const [recipient, setRecipient] = useState<TUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    //const currentUserId = getFromLocalstorage('user')?.id;


    useEffect(() => {

        if (!recipientId) return;

        const getResipient = async () => {
            try {
                const response = await getRequest(`users/find/${recipientId}`);
                if (response.error) {
                    console.error(response.message);
                    return setError(response.message || 'An unknown error occurred');
                }
                setRecipient(response);
            } catch (error) {
                console.error(error);
                setError('An unknown error occurred');
            }
        };

        getResipient();

    }, [recipientId]);

    return { recipient, error };

};

export default useFecthResipientUser;