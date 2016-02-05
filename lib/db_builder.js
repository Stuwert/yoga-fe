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
    UserSequences()
      .where('id', obj.id)
      .update(obj)
      .then(function(result){
        urback(result);
      });
  }

};
