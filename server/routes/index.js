
/**
 * Set all routes for API on the app object using the Router object
 */
module.exports = function (app, router) {
    // set up auth routes
    app = require('./auth')(app);


    /**
     * Middle ware to check for token to authenticate user
     *
     * sets req.user to user object if token is valid
     */
    router.use(function(req, res, next) {

        // check token

        // continue doing what we were doing and go to the route
        next();
    });

    router
        .route('/example')
        .get(function(req, res){
        });


    app.use('/api', router);

    return app;
}