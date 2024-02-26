import { Request, Response } from 'express';
import Chat from '../models/Chat';

export const createChat = async (req: Request, res: Response) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });

        if (chat) {
            return res.status(200).json(chat);
        }

        const newChat = new Chat({
            members: [firstId, secondId],
        });

        const response = await newChat.save();

        res.status(201).json(response);

    } catch (error) {
        console.error('Failed to create chat:', error);
        res.status(500).json({ message: 'Failed to create chat' });
    }
};

export const findUserChats = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const chats = await Chat.find({
            members: { $in: [userId] }
        });

        if (!chats) {
            return res.status(200).json([]);
        }

        res.status(200).json(chats);

    } catch (error) {
        console.error('Failed to find user chats:', error);
        res.status(500).json({ message: 'Failed to find user chats' });
    }
};

export const findChat = async (req: Request, res: Response) => {
    const { firstId, secondId } = req.params;

    if (!firstId || !secondId) {
        return res.status(400).json({ message: 'First and second user IDs are required' });
    }

    try {
        const chat = await Chat.find({
            members: { $all: [firstId, secondId] }
        });

        if (!chat) {
            return res.status(200).json([]);
        }

        res.status(200).json(chat);

    } catch (error) {
        console.error('Failed to find user chats:', error);
        res.status(500).json({ message: 'Failed to find user chats' });
    }
};

export const getAllChats = async (req: Request, res: Response) => {
    try {
        const chats = await Chat.find();

        if (!chats) {
            return res.status(200).json([]);
        }

        res.status(200).json(chats);
    } catch (error) {
        console.error('Failed to get all chats:', error);
        res.status(500).json({ message: 'Failed to get all chats' });
    }
}