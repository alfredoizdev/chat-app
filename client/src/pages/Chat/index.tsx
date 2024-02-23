import useChatContext from "@/hooks/useChatContext";

const Chat = () => {

  const { userChats } = useChatContext();
  console.log('User chats', userChats);
  return (
    <div>
      Chat
    </div>
  );
};

export default Chat;