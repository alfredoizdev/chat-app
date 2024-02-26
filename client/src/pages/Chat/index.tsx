import ChatList from "@/components/ChatList";
import ChatHeaderList from "@/components/HeaderChatList";
import ListOfUser from "@/components/ListOfUser";
import MessageBox from "@/components/MessageBox";
import useAuthContext from "@/hooks/useAuthContext";
import useChatContext from "@/hooks/useChatContext";
import { styled } from "@mui/material";

const Container = styled('div')`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-top: 30px;
`;

const Aside = styled('aside')`
    width: 30%;
    height: 100%;
    border-right: 1px solid #313131;

    @media (max-width: 575px) {
        display: none;
    }

`;

const Content = styled('div')`
    width: 70%;
    height: 100%;
    padding: 10px;

    @media (max-width: 575px) {
      width: 100%;
    }
`;

const Chat = () => {

  const { messages } = useChatContext();
  const { showList } = useAuthContext();


  return (
    <Container>
      <Aside>
        <ChatHeaderList />
        {showList === "ChatRoom" ? <ChatList /> : <ListOfUser />}
      </Aside>
      <Content>
        <MessageBox messages={messages} />
      </Content>
    </Container>
  );
};

export default Chat;