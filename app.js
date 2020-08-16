require('dotenv').config();

const express = require('express'),
	helmet = require('helmet'),
	body_parser = require('body-parser'),
	cors = require('cors'),
	morgan = require('morgan'),
	connect = require('./database/connection'),
	routes = require('./routes'),
	notFoundMiddleware = require('./middlewares/404'),
	errorHandlerMiddleware = require('./middlewares/error');

const app = express();


// logger and helmet and bodyparser middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(body_parser.json());


// connect to the database
connect();


// api routes
app.use('/api/', routes);


// 404 & error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);	

module.exports = app;
