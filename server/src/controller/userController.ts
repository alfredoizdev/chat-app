import { Request, Response } from 'express';
import { TUser } from '../lib/types/user';
import User from '../models/User';
import validator from 'validator';
import { comparePassword, hasPassowd } from '../lib/helpers';
import { createToken } from '../lib/jwt/jwtService';

export const registerUserController = async (req: Request, res: Response) => {

    try {
        const { name, email, password }: TUser = req.body;

        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        user = new User({
            name,
            email,
            password
        });

        user.password = await hasPassowd(password);

        await user.save();

        const token = createToken(user.id);
        res.json({ name, email, token, id: user.id });

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        res.status(500).send('Server Error');
    }

};

export const loginController = async (req: Request, res: Response) => {

    try {
        const { email, password }: TUser = req.body;

        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = createToken(user.id);

        res.json({ name: user.name, email, token, id: user.id });

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        res.status(500).send('Server Error');
    }
};

export const findUser = async (req: Request, res: Response) => {
    try {

        const userid = req.params.userid

        if (!userid) {
            res.status(400).send('Please enter a user id');
            return;
        }

        const findUser = await User.findById(userid)
            .select('-password');
        if (!findUser) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json(findUser);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        res.status(500).send('Server Error');
    }
};

export const findUsers = async (req: Request, res: Response) => {
    try {

        const findUser = await User.find()
            .select('-password');
        if (!findUser) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json(findUser);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        res.status(500).send('Server Error');
    }
};