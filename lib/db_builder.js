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
    console.log("Works 1");
    UserSequences()
      .where('id', id)
      .first()
      .then(function(result){
        callback(result);
      })
  },
  returnSequence: function(id, callback){
    console.log('Works 2');
    Sequences().
      where('id', id)
      .first()
      .then(function(result){
        callback(result);
      })
  }

};
