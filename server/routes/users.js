import User from '../models/user.js';
import express from 'express';

const router = express.Router();

/**
 * Defines routes related to users.
 *
 * @param {Object} router - Express router.
 * @returns {Object} - Express router.
 */
export default function (router) {
    const usersRoute = router.route('/users');
    const userRoute = router.route('/users/:email');

    /**
     * GET: Fetches all users.
     */
    usersRoute.get(async (req, res) => {
        try {
            console.log('GET /api/users endpoint hit');
            const users = await User.find({});
            console.log('Fetched users:', users);
            res.json({ users });

        } catch (err) {
            console.error('Error in GET /api/users:', err);
            res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    /**
     * POST: Creates a new user.
     */
    usersRoute.post(async (req, res) => {
        try {
            console.log('POST /api/users endpoint hit');
            console.log('Request body:', req.body);
            const { userName, email } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                console.log('User already exists:', existingUser);
                res.status(409).json({ message: 'ERROR: User with email already exists!' });
                return;
            }

            const newUser = new User({
                userName,
                email,
            });

            await newUser.save();
            const createdUser = await User.findOne({ email });
            res.status(201).json({ message: 'OK: Created user!', data: createdUser });

        } catch (err) {
            console.error('Error in POST /api/users:', err);
            res.status(500).json({ message: 'ERROR: Unknown error occurred.', data: {} });
        }
    });

    /**
     * GET: Fetches a specific user by email.
     */
    userRoute.get(async (req, res) => {
        try {
            const email = req.params.email;
            const user = await User.findOne({ email });

            if (!user) {
                res.status(404).json({ message: 'ERROR: User not found!' });
            } else {
                res.json({ user });
            }
        } catch (err) {
            res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    /**
     * GET: Fetches a user by username.
     */
    router.route('/users/username/:username').get(async (req, res) => {
        try {
            const userName = req.params.username;
            const user = await User.findOne({ userName });

        if (!user) {
            res.status(404).json({ message: 'ERROR: User not found!' });
        } else {
            res.json({ user });
        }
        } catch (err) {
            res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    return router;
};

export { router };