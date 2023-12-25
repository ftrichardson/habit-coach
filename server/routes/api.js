import express from 'express';
import defineHabitsRoutes from './habits.js';
import defineUsersRoutes from './users.js';
import defineFriendsRoutes from './friends.js';

const router = express.Router();

/**
 * Attaches routes to the Express app.
 *
 * @param {Object} app - Express application.
 * @param {Object} router - Express router.
 */
 export default function (app) {
    // Attaching habits routes under the '/api' path.
    defineHabitsRoutes(router);
    app.use('/api', router);

    // Attaching users routes under the '/api' path.
    defineUsersRoutes(router);
    app.use('/api', router);

    // Attaching friends routes under the '/api' path.
    defineFriendsRoutes(router);
    app.use('/api', router);
};