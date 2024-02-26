
import { styled } from '@mui/system';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import useAuthContext from '@/hooks/useAuthContext';

const Container = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#313131",
    padding: '5px',
});

type ButtonProps = {
    active?: boolean;
};


const Button = styled("div")<ButtonProps>(({ theme, active }) => ({
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: active ? theme.palette.primary.main : "#8b8b8b",
    cursor: "pointer",
    backgroundColor: "transparent",
    transition: "all 0.3s",
}));



const ChatHeaderList = () => {

    const { setShowList, showList } = useAuthContext();

    return (
        <Container>
            <Button
                active={showList === "ChatRoom"}
                onClick={() => setShowList("ChatRoom")}
            >
                <ForumIcon />
            </Button>
            <Button
                active={showList === "ListUser"}
                onClick={() => setShowList("ListUser")}
            >
                <PeopleAltIcon />
            </Button>
        </Container>
    );
}

export default ChatHeaderList;