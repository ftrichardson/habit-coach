import { router as habitsRouter } from './habits.js';
import { router as usersRouter } from './users.js';
import { router as friendsRouter } from './friends.js';

/**
 * Attaches routes to the Express app.
 *
 * @param {Object} app - Express application.
 * @param {Object} router - Express router.
 */
 export default function (app, router) {
    /**
     * Attaches habits routes under the '/api' path.
     */
    app.use('/api', habitsRouter);

    /**
     * Attaches users routes under the '/api' path.
     */
    app.use('/api', usersRouter);

    /**
     * Attaches friends routes under the '/api' path.
     */
    app.use('/api', friendsRouter);
};