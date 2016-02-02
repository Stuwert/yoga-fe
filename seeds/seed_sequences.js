
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('sequences').del(),

    // Inserts seed entries
    knex('sequences').insert({user_name: 'stuwert', sequence_name: "Bing Bong", poses: JSON.stringify([2, 3, 4, 2, 3, 4]), public: true}),
    knex('sequences').insert({user_name: 'stuwert', sequence_name: "Sing Song", poses: JSON.stringify([1, 2, 3, 2, 3, 4]), public: false})
  );
};
