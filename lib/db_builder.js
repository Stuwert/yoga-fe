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
  
  addIfDoesNotExist: function(s, callack) {
    Sequences()
      .whereRaw('sequence=?', [s])
      .then(function(result){
      if (result.length) callback(result);
      else Sequences()
        .insert({'sequence': s})
        .then(function(result){
        callback(result);
      });
    });
  },

  createUserSequence: function(obj) {
    UserSequences() 
      .insert(obj) 
      .then(function(result){
      callback(result);
    })
  }

};
