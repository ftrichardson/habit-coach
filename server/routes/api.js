/**
 * Attaches routes to the Express app.
 *
 * @param {Object} app - Express application.
 * @param {Object} router - Express router.
 */
 module.exports = function attachRoutes(app, router) {
    /**
     * Attaches habits routes under the '/api' path.
     */
    app.use('/api', require('./habits')(router));
  
    /**
     * Attaches users routes under the '/api' path.
     */
    app.use('/api', require('./users')(router));
  
    /**
     * Attaches friends routes under the '/api' path.
     */
    app.use('/api', require('./friends')(router));
};