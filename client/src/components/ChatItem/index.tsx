import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import useFecthResipientUser from '@/hooks/useFectRecipient';
import { TChat } from '@/lib/types/Chat';
import { Fragment } from 'react';
import { Typography, styled } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import avatar from '@/assets/profile.svg';
import useChatContext from '@/hooks/useChatContext';

type ChatItemProps = {
    chat: TChat;
};

const UnreadMessage = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: "20px",
    width: "20px",
    marginLeft: "5px",
    position: "absolute",
    top: "12px",
    left: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
}));

interface WrapperAvatarProps {
    borderColor?: boolean;
}


const WraperAvatar = styled("div")<WrapperAvatarProps>(({ theme, borderColor }) => ({
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    width: "50px",
    height: "50px",
    border: `3px solid ${borderColor ? theme.palette.primary.main : "#3b3b3b"}`,
}));


const ChatItem = ({ chat }: ChatItemProps) => {

    const { recipient } = useFecthResipientUser(chat);
    const { updateCurrentChat, onlineUsers } = useChatContext();
    const isOnline = onlineUsers.includes(recipient?.id || "");

    if (recipient === null) {
        return null;
    }

    return (
        <ListItem
            sx={{ cursor: "pointer" }}
            alignItems="flex-start"
            onClick={() => updateCurrentChat(chat, recipient)}
        >
            <UnreadMessage>3</UnreadMessage>
            <ListItemAvatar>
                <WraperAvatar borderColor={isOnline}>
                    <Avatar alt="Remy Sharp" src={avatar} />
                </WraperAvatar>
            </ListItemAvatar>
            <ListItemText
                primary={recipient.name}
                secondary={
                    <Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            " 12-11-2021"
                        </Typography>
                        {" — I'll be in your this…"}
                    </Fragment>
                }
            />
        </ListItem>

    );
};

export default ChatItem;