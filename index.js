var express = require('express'),
   app = express(),
   bodyParser = require('body-parser');
   var session = require('express-session')
   
app.set('views', './views')
app.set('view engine', 'ejs')


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave : false, saveUninitialized: false }))
   // resave => Forces the session to be saved back to the session store, even if the session was never modified 
   // saveUninitialized => the cookie will not be set on a response with an uninitialized session

app.use(function(req, res, next) {
   var sess = req.session
  
   next();
})
    app.post('/admin', urlencodedParser, function(req, res){
      req.session.email=req.body.email
      req.session.password=req.body.password
      console.log(req.body.email);
    if(req.session.email=='parn'&&req.session.password=='1234'){
       res.render('fruit', {fruits:['Hello' ,req.session.email],bt: "logout" })
    }
    else
    res.render('fruit', {fruits:['Please login first '],bt: "login"  })
     

   });

   app.get('/admin', urlencodedParser, function(req, res){
    console.log(req.body.email);
  if( req.session.email=='parn'&&req.session.password=='1234'){
     res.render('fruit', {fruits:['Hello' ,req.session.email],bt: "logout" })
  }
  else
  res.render('fruit', {fruits:['Please login first '],bt: "login"  })
   
 });


  app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/form.html');
        }
    });
 });

 
   
app.listen(8000);