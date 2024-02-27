import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Fragment, useEffect } from 'react';
import useAuthContext from '@/hooks/useAuthContext';
import User from '../User';
import SkeletonCard from '../shared/SkeletonCard/SkeletonCard';



const ListOfUser = () => {

    const { users, getListOfUsers, isLoading } = useAuthContext();

    useEffect(() => {
        getListOfUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!users) {
        return null;
    }

    return (
        <List
            sx={{
                height: '600px',
                overflowX: 'auto',
                marginTop: '0'
            }}
            component="nav"
            aria-label="main mailbox folders"
        >
            {isLoading && (
                <>
                    <SkeletonCard many={4} />
                </>
            )}
            {users.map(user => (
                <Fragment key={user.id}>
                    <User user={user} />
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
};

export default ListOfUser;