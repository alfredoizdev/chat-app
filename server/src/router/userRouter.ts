import express from 'express';
import { loginController, registerUserController, findUser, findUsers } from '../controller/userController';



const router = express.Router();

router.post('/register', registerUserController);
router.post('/login', loginController);
router.get('/find/:userid', findUser);
router.get('/', findUsers);

export default router;