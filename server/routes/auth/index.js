module.exports =  function(app) {
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

    return app;
};