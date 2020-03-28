const path = require('path');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/location',
    matchPath: '/location/:id',
    component: path.resolve('src/templates/location.js'),
  });
};
