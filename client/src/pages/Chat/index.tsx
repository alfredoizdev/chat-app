import ChatList from "@/components/ChatList";
import MessageBox from "@/components/MessageBox";
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

  const { userChats, messages } = useChatContext();


  return (
    <Container>
      <Aside>
        <ChatList chats={userChats} />
      </Aside>
      <Content>
        <MessageBox messages={messages} />
      </Content>
    </Container>
  );
};

export default Chat;