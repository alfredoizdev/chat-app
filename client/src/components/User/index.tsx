import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import avatar from '@/assets/profile.svg';
import { Typography, styled } from '@mui/material';
import { TUser } from '@/lib/types/User';
import useChatContext from '@/hooks/useChatContext';
import { getFromLocalstorage } from '@/lib/helpers';
import useAuthContext from '@/hooks/useAuthContext';
import FadeIn from '../shared/FadeIn/FadeIn';


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

type UserProps = {
    user: TUser
};

const User = ({ user }: UserProps) => {

    // const { recipient } = useFecthResipientUser(user?.id || "");
    const { onlineUsers, createChat } = useChatContext();
    const { setShowList } = useAuthContext();
    const currentUser = getFromLocalstorage('user');
    const isOnline = onlineUsers.includes(user?.id || "");

    if (!user && !currentUser) {
        return null;
    }

    const handleOnClick = () => {
        createChat(user?.id ?? "", currentUser?.id ?? "");
        setShowList("ChatRoom");
    };

    return (
        <FadeIn>
            <ListItem
                sx={{ cursor: "pointer" }}
                alignItems="flex-start"
                onClick={handleOnClick}
            >
                <ListItemAvatar>
                    <WraperAvatar borderColor={isOnline}>
                        <Avatar alt="Remy Sharp" src={avatar} />
                    </WraperAvatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
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
        </FadeIn>
    );
};

export default User;