import express from 'express';
import { createChat, findChat, findUserChats, getAllChats } from '../controller/chatController';



const router = express.Router();

router.post('/', createChat);
router.get('/all', getAllChats);
router.get('/:userId', findUserChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;