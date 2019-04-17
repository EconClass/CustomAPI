const Deck = require('../models/deck.js');
      // User = require('../models/user.js');

module.exports = (app) => {
  //=============HOME=============\\
  app.get('/', (req, res) => {
    const page = req.query.page || 1;

    Deck.paginate()
      .then((results) => {
        res.render('decks-index', { 
          decks: results.docs,
          pagesCount: results.pages,
          currentPage: page, 
        });
      })
  });

  //=============NEW DECK=============\\
  app.get('/decks/new', (req, res) => {
    res.render('decks-new');
  });

  //=============SEARCH DECK=============\\
  app.get('/search', (req, res) => {
    term = new RegExp(req.query.term, 'i');

    const page = req.query.page || 1;

    Deck.find({'deckname': term})
      .exec((_, decks) => {
        res.render('decks-index', { 
          decks: decks,
          currentPage: page });
      });
  });

  //=============SEE DECK=============\\
  app.get('/deck/:id', (req, res) => {
    Deck.findOne({ _id :req.params.id })
      .then((deck) => {
        res.render('decks-show', { deck: deck} );
      });
  });

  //=============CREATE DECK=============\\
  app.post('/decks', (req, res) => {
    // if (req.user) {
      let deck = new Deck(req.body);

      deck.save()
        .then(() => {
          res.redirect('/');
          // return User.find({_id: req.user._id})
        })
        // .then((user) =>{
        //   user.decks.unshift(deck);
        //   user.save();
        //   res.redirect('/')
        // })
        .catch((err) => {
          console.log(err)
        });
    // } else {
    //   return res.status(401);
    // };
  });

  //=============DELETE DECK=============\\
  app.delete('/decks/:id', (req, res) => {
    Deck.findOneAndDelete({_id: req.params.id})
      .then((deck) => {
        res.redirect('/user');
      })
      .catch((err) => {
        console.log(err)
      });
  });
};