var knex = require('../db/knex')

// KNEX RETURNS
function User(){
  return knex('users');
}

module.exports = {

  getUser: function(id, callback){
    User()
      .where('id', id)
      .first()
      .then(function(result){
        callback(result);
      })
  },


  updateUser: function(obj, callback){
    
    User()
      .where('id', obj.id)
      .update(obj)
      .then(function(result){
        callback(result);
      });
  }

};
