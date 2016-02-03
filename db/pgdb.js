//PostgreSQL queries live here
var knex = require('./knex')

function users() {
  return knex('users')
}


  function FBfindOrCreate(j,x) {
    var insertedObject = {
      first_name: 'first name',
      last_name: 'last name',
      email: 'email'
      fb_id: 'id',
      image: 'imageUrl'

    }

    users().select().where(fb_id, x).then(function(results){
      console.log(results);
      if(results.length == 0) {
        users().insert(insertedObject).then(function(inserted){
        })
      }


    })
  }

module.exports = {



}
