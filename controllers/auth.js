const User = require('../models/user.js'),
      jwt = require('jsonwebtoken'),
      secret = process.env.SECRET,
      nodemailer = require('nodemailer'),
      mg = require('nodemailer-mailgun-transport');

// Mailgun
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports = (app) => {
  //=============USER SIGNUP FORM=============\\
  app.get('/form/signup', (req, res) => {
    res.render('signup')
  });
  
  //=============CREATE USER=============\\
  app.post('/user/signup', (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    
    user.save()
      .then( user => {
        let token = jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      }).then( mail => {
          console.log(mail)
          const recipient = {
            email: req.body.email,
            name: req.body.username
          }
          nodemailerMailgun.sendMail({
            from: 'no-reply@example.com',
            to: recipient.email, // An array if you have multiple recipients.
            subject: 'Hey you, awesome!',
            template: {
              name: 'email.handlebars',
              engine: 'handlebars',
              context: recipient
            }
          })
        }).then(() => {
          res.redirect("/");
        }).catch((err)=>{
          console.log(err.message);
          return res.status(400).send({ err: err });
        });
  });

  //=============VIEW USER=============\\
  app.get('/user', (req, res) => {
    let user = req.user;
    if (user != null) {
      User.findOne({username: user.username})
        .then( (data) => {
          res.send(user.decks);
        });
    } else {
      res.send('Please login!')
    }
  });

  //=============LOG-IN USER=============\\
  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username: username }, "username password")
      .then(user => {
        if (!user) {
          // User not found
          return res.status(401).send({ message: "Wrong Username or Password" });
        };

        // Check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // Password does not match
            return res.status(401).send({ message: "Wrong Username or Password" });
          };

          // Create a token
          const token = jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: "60 days" });

          // Set a cookie and redirect to root
          res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
          res.redirect("/");
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //=============LOG-OUT USER=============\\
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });
  
  //=============UPDATE USER PASSWORD=============\\
  app.put('/user/:username/edit', (req, res) => {
    const username = req.params.username;
    const newPassword = req.body.newPassword;
    // Find this user name
    User.findOneAndUpdate({ username: username }, {password: newPassword})
      .then(user => {
        if (!user) {
          // User not found
          return res.status(401).send({ message: "Wrong Username or Password" });
        };
        res.redirect('/');
      });
  });
  
  //=============DELETE USER=============\\
  app.delete('/user/:username', (req, res) => {
    User.findOneAndDelete({username: req.params.username})
      .then((response) => {
        res.redirect('/');
      });
  });
};