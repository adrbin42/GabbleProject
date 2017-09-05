
const models = require('../models');

models.user.bulkCreate('users', [
{
  firstname: 'Adrienne',
  lastname: 'Jones',
  username: 'user1',
  password: 'winnerswin'
   },
   {
   firstname: 'John',
   lastname: 'Abraham',
   username: 'user2',
   password: 'winnerswin'
   },
   {
   firstname: 'Cherians',
   lastname: 'Mus',
   username: 'user3',
   password: 'winnerswin'
   },
   {
   firstname: 'Charles',
   lastname: 'Angles',
   username: 'user4',
   password: 'winnerswin'
  },
  {
  firstname: 'Shalini ',
  lastname: 'Kher',
  username: 'user5',
  password: 'winnerswin'
 },
 ]).then(function() {
  return models.user.findAll();
}).then(function(users) {
   console.log(users);
 });

models.message.bulkCreate('messages', [{
    message: 'Thinking of buying a car',
    userid: 5
}, {
  message: 'had to leave church early',
  userid: 4
}, {
  message: 'Was really angry at my sister.',
  userid: 9
}, {
  message: 'A little angry at my father for what he did',
  userid: 5
}, {
  message: 'What Dad did was very wrong. Try not to let it bother you.',
  userid: 3
}, {
  message: 'Dont know if I will get over what Dad did.',
  userid: 2
}, {
  message: 'Meet me at 8am tomorrow.',
  userid: 8
}]).then(function() {
    return models.message.findAll();
}).then(function(messages){
    console.log(messages) //Returns an array of user objects.
});
