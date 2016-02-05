var knex = require('../db/knex')

// KNEX RETURNS
function Sequences(){
  return knex('sequences');
}
function User(){
  return knex('users');
}

function UserSequences(){
  return knex('user_sequences')
}

module.exports = {

  addIfDoesNotExist: function(s, callback) {
    Sequences()
      .insert({ 'sequence': JSON.stringify(s) })
      .returning('id')
      .then(function(result){
        callback(result)
      });
  },

  createUserSequence: function(obj, callback) {
    UserSequences()
      .insert(obj)
      .then(function(result){
        callback(result);
    })
  },

  returnUserSequence: function(id, callback){
    UserSequences()
      .where('id', id)
      .first()
      .then(function(result){
        callback(result);
      })
  },

  returnSequence: function(id, callback){
    Sequences()
      .where('id', id)
      .first()
      .then(function(result){
        callback(result);
      })
  },


  updateUserSequence: function(obj, urback){
    console.log(obj);
    UserSequences()
      .where('id', obj.id)
      .update(obj)
      .then(function(result){
        urback(result);
      });
  },
  deleteUserSequence: function(id, callback){
    UserSequences()
      .where('id', id)
      .delete()
      .then(function(result){
        callback(result);
      })
  },
  returnPublicSequences: function(callback){
    User()
      .rightJoin('user_sequences', 'user_sequences.user_id', 'users.id' )
      .where('is_public', true )
      .then(function(result){
        console.log(result);
        callback(result);
      })
  }

};
