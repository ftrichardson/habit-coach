import User from '../models/user.js';

/**
 * Defines routes related to user's friends.
 * 
 * @param {Object} router - Express router.
 * @returns {Object} - Express router.
 */
export default function defineFriendsRoutes(router) {
    const friendsRoute = router.route('/users/:email/friends');
    const notFriendRoute = router.route('/users/:email/notfriends');

    /**
     * GET endpoint to fetch all friends of a user (name and email of friends).
     */
    friendsRoute.get(async function (req, res) {
        try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'ERROR: User not found!' });
        }

        const friendsEmail = user.friends;
        let friendsNameEmail = [];

        if (friendsEmail.length !== 0) {
            for (const friendEmail of friendsEmail) {
            const friendData = await User.findOne({ email: friendEmail });
            friendsNameEmail.push([friendData.email, friendData.userName]);
            }
        }

        res.json({ friendsNameEmail });
        } catch (err) {
        res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    /**
     * PUT endpoint to remove a friend from the user's list.
     */
    friendsRoute.put(async function (req, res) {
        try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'ERROR: User not found!' });
        }

        await User.updateOne({ email }, { $pullAll: { friends: [req.body.friendEmail] } });

        res.json({ message: 'Unfollowed Friend Successfully' });
        } catch (err) {
        res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    /**
     * GET endpoint to get users who are not friends.
     */
    notFriendRoute.get(async function (req, res) {
        try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'ERROR: User not found!' });
        }

        let friendsEmail = user.friends;

        if (friendsEmail.length === 0) {
            const allUsers = await User.find({});
            let notFriendsNameEmail = [];

            for (const user of allUsers) {
            notFriendsNameEmail.push([user.email, user.userName]);
            }

            return res.json({ notFriendsNameEmail });
        } else {
            const allUsers = await User.find({ email: { $nin: friendsEmail } });
            let notFriendsNameEmail = [];

            for (const user of allUsers) {
            notFriendsNameEmail.push([user.email, user.userName]);
            }

            return res.json({ notFriendsNameEmail });
        }
        } catch (err) {
        res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    /**
     * PUT endpoint to add a friend to the user's list.
     */
    notFriendRoute.put(async function (req, res) {
        try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'ERROR: User not found!' });
        }

        await User.updateOne({ email }, { $addToSet: { friends: req.body.friendEmail } });

        res.json({ message: 'Followed Friend Successfully' });
        } catch (err) {
        res.status(500).json({ message: 'ERROR: Unknown error occurred.' });
        }
    });

    return router;
};