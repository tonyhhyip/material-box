'use strict';

const {readdirSync} = require('fs');

readdirSync('./gulp/tasks').forEach((file) => {
  require(`./gulp/tasks/${file}`);
});
