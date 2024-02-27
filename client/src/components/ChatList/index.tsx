import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Fragment } from 'react';
import ChatItem from '../ChatItem';
import useChatContext from '@/hooks/useChatContext';
import SkeletonCard from '../shared/SkeletonCard/SkeletonCard';

const ChatList = () => {

    const { userChats, isUserChatLoading } = useChatContext();

    if (!userChats) {
        return null;
    }

    return (
        <>
            <List
                sx={{
                    height: '600px',
                    overflowX: 'auto',
                    marginTop: '0'
                }}
                component="nav"
                aria-label="main mailbox folders"
            >
                {isUserChatLoading &&
                    <SkeletonCard many={4} />
                }
                {userChats.map(chat => (
                    <Fragment key={chat.id}>
                        <ChatItem chat={chat} />
                        <Divider />
                    </Fragment>
                ))}
            </List>
        </>
    );
};

export default ChatList;