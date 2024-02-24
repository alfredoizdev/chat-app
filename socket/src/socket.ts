import { Server } from 'socket.io';

const io = new Server({ cors: { origin: "*" } });

type User = {
    id: string;
    socketId: string;
};

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

    socket.on('sendMessage', (response, resipientid) => {

        const recipientSocketId = onlineUsers.find(user => user.id === resipientid)?.socketId;

        if (recipientSocketId) {
            io.to(recipientSocketId).emit('newMessage', response);
        }
    });

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('disconnect onlineUsers', onlineUsers); // emit to all clients
    });
});

const port = Number(process.env.PORT) || 4000;

io.listen(port);