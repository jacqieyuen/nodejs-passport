var Twitter = require('twitter');


module.exports = function(app, passport){

  // Routes
  // router middelware
  function isLoggedIn(req, res, next) {

    if(req.isAuthenticated()) {
      return next();
    }

    res.redirect('/')
  }

  app.get('/twitter', isLoggedIn, function(req, res){
    res.render('twitter', { message: req.flash('loginMessage') });
  });
  app.post('/twitter/send', isLoggedIn, function(req, res){
    var tweet = req.body.tweet;

    var client = new Twitter({
      consumer_key: '6a3fukp45Rrf3AkBDdNNGO0Bv',
      consumer_secret: 'QcIHMskB0F77Xzi1KmUYMntBVAmjJGNxqCFP8qAZ9bx1sR38yu',
      access_token_key: req.user.twitter.token,
      access_token_secret: req.user.twitter.secret
    });
      // post to twitter MAGIC FUNCTION
    client.post('statuses/update', {status: tweet},  function(error, tweet, response) {
      if(error) console.log(error);
      // console.log(tweet);  // Tweet body.
      // console.log(response);  // Raw response object.
      res.json('sucess, tweet has been posted')
    });
  });
}