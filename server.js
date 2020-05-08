const express = require("express");
const server = express();
//routes
const actionsRouter = require('./actions/actionsRouter');
const projectsRouter = require('./projects/projectsRouter');

//global middleware
server.use(express.json());

//directing routes
server.use('/api/projects', logger, projectsRouter);
server.use('/api/projects/', logger, actionsRouter);

server.get('/', logger, (req, res)=>{
    res.send(`<h2>Sprinty McSprintenson</h2>`)
})

//logger function
function logger(req, res, next) {
    let date = new Date().toISOString();
    console.log(`A ${req.method} to ${req.url} occured at ${date} `);
  
    next();
  }
  

module.exports = server;