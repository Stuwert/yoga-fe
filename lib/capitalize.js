// Capitalize the first letter of a string

var capitalize = function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

module.exports = capitalize
