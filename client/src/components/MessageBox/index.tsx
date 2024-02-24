import useAuthContext from '@/hooks/useAuthContext';
import { TMessage } from '@/lib/types/Chat';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import moment from 'moment';
import useChatContext from '@/hooks/useChatContext';
import FormMessage from '../FormMessage';

const Container = styled('div')`
    width: 100%;
    height: 600px;
    overflow-x: auto;
`;

const MessageContainer = styled('div')`
    width: 100%;
    height: auto;
`;

const MessageLeft = styled('div')(({ theme }) => ({
    // Use the theme here
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '10px',
    height: 'auto',
    '& span': {
        backgroundColor: theme.palette.secondary.main,
        padding: '15px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        minWidth: '15%',
    },
    '& div': {
        display: 'flex',
        justifyContent: 'flex-start',
        color: theme.palette.text.secondary,
    }
}));

const MessageRight = styled('div')(({ theme }) => ({
    // Use the theme here
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right',
    padding: '10px',
    height: 'auto',
    '& span': {
        backgroundColor: theme.palette.primary.main,
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        minWidth: '15%',
        padding: '15px',
    },
    '& div': {
        display: 'flex',
        justifyContent: 'flex-end',
        color: theme.palette.text.secondary,
    }
}));

const NoMessages = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;

`;

const HeaderMessage = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 20px;
    text-align: center;
`;

type MessageBoxProps = {
    messages: TMessage[];
};

const MessageBox = ({ messages }: MessageBoxProps) => {

    const { user } = useAuthContext();
    const { chatWithName } = useChatContext();

    if (messages.length === 0) {
        return <NoMessages>
            <SpeakerNotesOffIcon sx={{ fontSize: 70, padding: '10px' }} />
            <Typography variant="h6">No messages please select one or start an conversation</Typography>
        </NoMessages>;
    }

    return (
        <>
            <HeaderMessage>
                <Typography variant="h6">Chatting with {chatWithName}</Typography>
            </HeaderMessage>
            <Container>
                {messages.map((message, index) => (
                    <MessageContainer key={index}>
                        {message.senderId !== user?.id ? (
                            <MessageLeft>
                                <span>
                                    <Typography variant="body1">{message.text}</Typography>
                                </span>
                                <div>
                                    <Typography variant="subtitle2"> {moment(message.createdAt).calendar()}</Typography>
                                </div>
                            </MessageLeft>
                        ) : (
                            <MessageRight>
                                <span>
                                    <Typography variant="body1">{message.text}</Typography>
                                </span>
                                <div>
                                    <Typography variant="subtitle2">{moment(message.createdAt).calendar()}</Typography>
                                </div>
                            </MessageRight>
                        )}
                    </MessageContainer>
                ))}
            </Container>
            <FormMessage />
        </>

    );
};


export default MessageBox;