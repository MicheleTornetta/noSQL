const connection = require('../config/connection');
const { Post, User, Response } = require('../models');
const getRandomName = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Post.deleteMany({});
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    // const userName = getRandomName();

    users.push({
      userName: 'User' + i, // + userName,
      email: i + "abc@abc.com",
      posts: [],
      friends: [],
    });
  }

  await User.collection.insertMany(users);
  console.log(users);
  process.exit(0);
});
