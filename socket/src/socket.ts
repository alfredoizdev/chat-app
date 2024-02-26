import { Server } from 'socket.io';

const io = new Server({ cors: { origin: "*" } });

type User = {
    id: string;
    socketId: string;
};

type SendMessage = {
    chatId: string;
    createdAt: string;
    id: string;
    senderId: string;
    text: string;
    updatedAt: string;
}

let onlineUsers: User[] = [];

io.on('connection', (socket) => {

    socket.on('addNewUser', (userId: string) => {
        if (!onlineUsers.some((user) => user.id === userId)) {
            onlineUsers.push({
                id: userId,
                socketId: socket.id
            });
            io.emit('onlineUsers', onlineUsers); // emit to all clients
        }
    });

    socket.on('sendMessage', (response: SendMessage, resipientId: string) => {

        const recipientSocketId = onlineUsers.find(user => user.id === resipientId)?.socketId;

        if (recipientSocketId) {
            io.to(recipientSocketId).emit('newMessage', response);
            io.to(recipientSocketId).emit('newNotification', {
                senderId: response.senderId,
                isRead: false,
                date: new Date().toISOString(),
            });
        }
    });

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('disconnect onlineUsers', onlineUsers); // emit to all clients
    });
});

const port = Number(process.env.PORT) || 4000;

io.listen(port);