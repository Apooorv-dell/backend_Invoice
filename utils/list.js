const _ = require("lodash");

module.exports = function (array) {
  let categories = new Set();

  array.map((a) => {
    categories.add(a.category);
  });
  return  _.toArray(categories);
};
