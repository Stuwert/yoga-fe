var knex = require('../db/knex')

// KNEX RETURNS
function Favs(){
  return knex('user_favorites');
}
function User(){
  return knex('users');
}

module.exports = {
  get_user_favorites: function(user, callback){

    User().where('username', user).first().then(function(u){
      Favs().where('user_id', u.id).then(function(results){
        console.log(results);
        callback(results);
      });
    });

  }
};
