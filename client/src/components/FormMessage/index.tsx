import InputEmoji from "react-input-emoji";
import { styled } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useState } from "react";
import useChatContext from "@/hooks/useChatContext";
import useAuthContext from "@/hooks/useAuthContext";

const Container = styled('div')`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;


const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '5px',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    }

}));

const FormMessage = () => {

    const { sendMessage } = useChatContext();
    const { user } = useAuthContext();

    const [message, setMessage] = useState('');

    const onChange = (text: string) => {
        setMessage(text);
    };

    const handleClick = () => {
        if (!user?.id) return;
        sendMessage(message, user.id);
        setMessage('');
    }


    return (
        <Container>
            <InputEmoji
                value={message}
                onChange={onChange}
                cleanOnEnter
                onEnter={handleClick}
                theme="dark"
            />
            <Button onClick={handleClick}>
                <ArrowOutwardIcon />
            </Button>
        </Container>
    );
};

export default FormMessage;