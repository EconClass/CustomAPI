const User = require('../models/user.js'),
    jwt = require('jsonwebtoken'),
    secret = process.env.SECRET;

module.exports = (app) => {
    //=============HOME=============\\
    app.get('/', (req, res) => {
        res.text('Welcome!');
    });
    //=============CREATE USER=============\\
    app.post('/user', (req, res) => {
        const user = new User(req.body);
        user.save()
        .then( user => {
            let token = jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
        })
        .catch((err)=>{
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
    });
    //=============VIEW USER=============\\
    app.get()
    //=============LOG-IN USER=============\\
    app.post()
    //=============UPDATE USER=============\\
    app.put()
    //=============DELETE USER=============\\
    app.delete()
}