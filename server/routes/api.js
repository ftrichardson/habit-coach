import express from 'express';
import defineHabitsRoutes from './habits.js';
import defineUsersRoutes from './users.js';
import defineFriendsRoutes from './friends.js';

/**
 * Attaches routes to the Express app.
 *
 * @param {Object} app - Express application.
 * @param {Object} router - Express router.
 */
 export default function (app) {
    const habitsRouter = express.Router();
    const usersRouter = express.Router();
    const friendsRouter = express.Router();

    // Attaching habits routes under the '/api' path.
    defineHabitsRoutes(habitsRouter);
    app.use('/api', habitsRouter);

    // Attaching users routes under the '/api' path.
    defineUsersRoutes(usersRouter);
    app.use('/api', usersRouter);

    // Attaching friends routes under the '/api' path.
    defineFriendsRoutes(friendsRouter);
    app.use('/api', friendsRouter);
};