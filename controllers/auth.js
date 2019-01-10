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
    app.get('/user', (req, res) => {
        let user = req.user;
        User.findOne({username: user.username})
            .then( (data) => {
                res.send(user.username)
            });
    });

    //=============LOG-IN USER=============\\
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this user name
        User.findOne({ username }, "username password")
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
                    // console.log(`user is ${user}`);
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

    //=============UPDATE USER=============\\
    // app.put('/user/:username/edit', (req, res) => {
    //     const username = req.params.username;
    //     const password = req.body.password;
    //     const newPassword = req.body.newPassword;
    //     // Find this user name
    //     User.findOne({ username }, "username password")
    //         .then(user => {
    //             if (!user) {
    //                 // User not found
    //                 return res.status(401).send({ message: "Wrong Username or Password" });
    //             };

    //             // Check the password
    //             user.save()
    //                 .then( user => {
    //                     let token = jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: "60 days" });
    //                     res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    //                     res.redirect("/");
    //                 })
    //                 .catch((err)=>{
    //                     console.log(err.message);
    //                     return res.status(400).send({ err: err });
    //                 });
    //         })
            
    // });
    
    //=============DELETE USER=============\\
    app.delete('/user/:username', (req, res) => {
        User.findOneAndDelete({username: req.params.username})
            .then((response) => {
                res.redirect('/');
            });
    });
};