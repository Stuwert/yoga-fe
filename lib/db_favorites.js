var knex = require('../db/knex')

// KNEX RETURNS
function Favs(){
  return knex('user_favorites');
}
function User(){
  return knex('users');
}

function UserSequences(){
  return knex('user_sequences')
}

module.exports = {
  get_user_favorites: function(user, callback){

    Favs().where('user_id', user).then(function(results){
      callback(results);
    });

  },
  get_user_sequences: function(user, callback){
    UserSequences().where('user_id', user).then(function(results){
      callback(results);
    })
  },
  addFavorite: function(obj, callback){
    Favs().insert(obj).then(function(results){
      callback(results);
    })
  }
};
