
import { styled } from '@mui/system';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import useAuthContext from '@/hooks/useAuthContext';
import useChatContext from '@/hooks/useChatContext';

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
    const { setCurrentChat, setChatWith } = useChatContext();

    const handleOnClick = (whatToShow: string) => {
        setCurrentChat(null);
        setChatWith(null);
        setShowList(whatToShow === "ChatRoom" ? "ChatRoom" : "ListUser");
    };

    return (
        <Container>
            <Button
                active={showList === "ChatRoom"}
                onClick={() => handleOnClick("ChatRoom")}
            >
                <ForumIcon />
            </Button>
            <Button
                active={showList === "ListUser"}
                onClick={() => handleOnClick("ListUser")}
            >
                <PeopleAltIcon />
            </Button>
        </Container>
    );
}

export default ChatHeaderList;