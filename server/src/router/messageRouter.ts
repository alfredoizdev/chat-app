import express from 'express';
import { createMessage, getMessages } from '../controller/massageController';

const router = express.Router();

router.post('/', createMessage);
router.get('/:chatId', getMessages);


export default router;