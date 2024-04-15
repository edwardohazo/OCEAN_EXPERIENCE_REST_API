import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {error} from '../utils/error.js';

export const register = async (req, res, next) => {

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });

        const savedUser = await newUser.save();
        res.status(200).json('User has been created!');
    } catch (err) {
        next(err);
    }
}


export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return next(error(404, 'User not found!'));

        // Authentication
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(error(404, 'Wrong password!'));

        // Authorization
        const token = jwt.sign(
            {
                id: user._id, 
                isAdmin: user.isAdmin
            },  process.env.JWT_SECRET);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails});
    } catch (err) {
        next(err);
    }
}