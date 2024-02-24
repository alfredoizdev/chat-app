import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TChat } from '@/lib/types/Chat';
import { Fragment } from 'react';
import ChatItem from '../ChatItem';

type ChatListProps = {
    chats: TChat[] | null;
};

const ChatList = ({ chats }: ChatListProps) => {

    if (!chats) {
        return null;
    }

    return (
        <List
            sx={{
                height: '600px',
                overflowX: 'auto'
            }}
            component="nav"
            aria-label="main mailbox folders">
            {chats.map(chat => (
                <Fragment key={chat.id}>
                    <ChatItem chat={chat} />
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
};

export default ChatList;