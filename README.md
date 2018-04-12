# Scalable socketio server

Shows a list of IP addresses viewing the page
Application launched with docker: node server with redis server as a message broker for scaling 
and nginx server as a balancer and web server for static client files (`index.html` and `index.js`)

## Installation
1. `git clone` this repo
2. Make sure you use latest `docker` and `docker-compose`
3. Run `docker-compose up`. It builds `web`, `redis` and `socket-server` containers for you. 
Run `docker-compose build` if you want to rebuild containers
4. Site available on `0.0.0.0:80` on Unix-like systems (check `ifconfig` to find correct IP if not)

## Development
Client uses Webpack to create bundle index.js. 
If something changed in `client/src` directory, `yarn build` should be launched to update index.js bundle

## Automated Test
1. Unit tests launch `yarn test-unit`
2. Functional tests must be launched in docker env like `docker exec currentlyviewingapp_socket-server_1 yarn test-func`

## Manual Test
*!!!NOTE!!!* In purpose of testing on one machine, websocket server doesn't use real IPs, but number which changed every 10 seconds.

When user opens a tab in browser, number N assigned to this tab via socket connection.

When user opens the second tab in browser, application assigns the same number N or the new number M.

IF the second tab assigned with number N and user closes the first tab, it's "IP-number" still in the list, 
because there is at least one tab. 
It allows to see how would it work if user opens many tabs from the same and different computers.

Uncomment server/src/index.js:15 if you wish to see real IP addresses (requires to restart docker container)

## TODOs
1. add deploy script to launch `yarn build` before docker containers start. 
Ignore client index.js bundle from get repo