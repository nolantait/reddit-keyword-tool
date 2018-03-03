"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const RedditRouter_1 = require("./routes/RedditRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Endpoints: [GET /api/v1/keywords/thread query:{thread=/r/reddit-thread-url limit=10}] [GET /api/v1/keywords/subreddit query:{subreddit=/r/funny limit=10}]'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/keywords', RedditRouter_1.default);
    }
}
exports.default = new App().express;
