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

function arraysAreEqual(a, b){
  if (a.length !== b.length) return false;
  a = a.sort();
  b = b.sort();
  var result = true;
  a.forEach(function(curr, idx, arr){
    if (a[idx] !== b[idx])
      result = false;
  });
  return result;
}

function sequenceExistsInArray(sequence, array, callback){
  var result = true;
  array.forEach(function(curr, idx, arr){
    if (!arraysAreEqual(curr, sequence))
      result = false;
  });
  return result;
}

module.exports = {
  
  addIfDoesNotExist: function(s, callack) {
    Sequences().then(function(results){
      if (sequenceExistsInArray(s, results)) {
        callback(results)
      } else {
        Sequences()
          .insert({ 'sequence': JSON.parse(s) })
          .then(function(result){
          callback(result)
        });
      }
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
