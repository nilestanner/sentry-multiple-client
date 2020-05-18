require('dotenv').config();
const Sentry = require('@sentry/node');


// create clients
const client1 = new Sentry.NodeClient({
  dsn: process.env.PROJECT_1_DSN,
});

const client2 = new Sentry.NodeClient({
  dsn: process.env.PROJECT_2_DSN,
});

// create hubs with clients
const project1 = new Sentry.Hub(client1);
const project2 = new Sentry.Hub(client2);

// add any tags to each project
project1.run((currentHub) => {
  currentHub.configureScope((scope) => {
    scope.setTag('project', 1);
  });
});

project1.captureMessage('hello world 1');

project2.run((currentHub) => {
  currentHub.configureScope((scope) => {
    scope.setTag('project', 2);
  });
});

project2.captureMessage('hello world 2');