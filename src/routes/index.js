const router = require('express').Router();
const authRouter = require('./auth');
const postTweetRoute = require('./tweets/tweetsRouter');

router.use('/auth', authRouter);
router.use('/tweet', postTweetRoute);
router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.get('/welcome', (req, res) => {
  res.send('You are logged in');
});

router.get('/', (req, res) => {
  db('twitter_users')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ error: 'The user with the specified ID does not exist.' });
    return;
  }
  db('twitter_users as t')
    .where('t.twitter_users_id', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

module.exports = router;
