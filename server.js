const express = require('express');
const db = require('./config/connection');
// Require model
const { index, User } = require('./models');

const PORT = process.env.PORT || 8675;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates a new user
app.post('/new-user/:user', (req, res) => {
  const newUser = new User({ name: req.params.user });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/all-users', async (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      console.log('Something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  try{
    const result = await User.find().exec();
    res.status(200).json(result);
  }
  catch(err){
    res.status(500).send({ message: "Internal Server Error"});
  }
});

// Finds the first matching document
app.get('/user', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.findOne({ name: 'login' }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds first document matching parameter and deletes
// For demo, use 'Wine' as URL param
app.delete('/find-one-delete/:userName', (req, res) => {
  User.findOneAndDelete(
    { name: req.params.userName },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});


// Updating one record and saving it
app.put('/find-one-update/:userName/:updatedName', async(req, res) => {
  try{
    const result = await User.findOneAndUpdate(
      { name: req.params.UserName, },
      { name: req.params.updatedName, },
      {
        new: true, // show the new value
        upsert: true // Make this update into an upsert
      }
    );

    res.status(200).json(result);
    console.log(`Updated: ${result}`);
  }
  catch(err){
    console.log('Something went wrong');
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port App listening at http://localhost:${PORT}!`);
  });
});
