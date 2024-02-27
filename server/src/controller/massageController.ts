import { Request, Response } from "express";
import Message from "../models/Message";
import Unread from "../models/Unread";

export const createMessage = async (req: Request, res: Response) => {
    const { chatId, senderId, text } = req.body;

    try {
        const newMessage = new Message({
            chatId,
            senderId,
            text,
        });

        if (!chatId || !senderId || !text) {
            return res.status(400).json({ message: 'Chat ID, sender ID, and text are required' });
        }

        const unRead = await Unread.findOne({ senderId });
        if (unRead) {
            await Unread.updateOne({ senderId }, { $inc: { unRead: 1 } });
        } else {
            const newUnread = new Unread({
                chatId,
                senderId,
                unRead: 1
            });
            await newUnread.save();
        }

        const response = await newMessage.save();


        res.status(201).json(response);

    } catch (error) {
        console.error('Failed to create message:', error);
        res.status(500).json({ message: 'Failed to create message' });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;

    if (!chatId) {
        return res.status(400).json({ message: 'Chat ID is required' });
    }

    try {
        const messages = await Message.find({ chatId });

        res.status(200).json(messages);

    } catch (error) {
        console.error('Failed to get messages:', error);
        res.status(500).json({ message: 'Failed to get messages' });
    }
};