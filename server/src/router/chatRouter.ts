import express from 'express';
import {
    createChat,
    findChat,
    findUserChats,
    getAllChats,
    getUnreadMessagesBySenderId,
    getAllUnreadMessages,
    cleanUnreadMessages
} from '../controller/chatController';



const router = express.Router();

router.post('/', createChat);
router.get('/all', getAllChats);
router.get('/:userId', findUserChats);
router.put('/unread', cleanUnreadMessages);
router.get('/unread/all', getAllUnreadMessages);
router.get('/unread/:senderId', getUnreadMessagesBySenderId);
router.get('/find/:firstId/:secondId', findChat);

export default router;