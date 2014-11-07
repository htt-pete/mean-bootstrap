
/**
 * Set all routes for API on the app object using the Router object
 */
module.exports = function (app, router) {

    // auth routes
    app
    .route('/auth/login')
    .post(function(req,res){
        res.send('hello world');
    });

    app
    .route('/auth/register')
    .post(function(req, res){
        res.send('boolean');
    });

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