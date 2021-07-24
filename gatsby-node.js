/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const tasks = await graphql(`
    {
        allNodeTask {
          nodes {
            id
            title
            path {
              alias
            }
          }
        }
    }
  `);

  tasks.data.allNodeTask.nodes.map(taskData =>
    createPage({
      path: taskData.path.alias,
      component: path.resolve(`src/templates/task.js`),
      context: {
        TaskId: taskData.id,
      }
    })
  );
}