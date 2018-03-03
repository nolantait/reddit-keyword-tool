"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RedditUtility_1 = require("../RedditUtility");
class RedditRouter {
    /**
     * Initialize the RedditRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Keywords.
     */
    getThreadKeywords(req, res, next) {
        RedditUtility_1.default.getWordListForThread(req.query.thread)
            .then(function (data) {
            let limit = req.query.limit;
            if (!limit) {
                limit = data.length;
            }
            res.send(data.slice(0, limit));
        });
    }
    getSubredditKeywords(req, res, next) {
        RedditUtility_1.default.getWordListForSubreddit(req.query.subreddit)
            .then(function (data) {
            let limit = req.query.limit;
            if (!limit) {
                limit = data.length;
            }
            res.send(data.slice(0, limit));
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/thread', this.getThreadKeywords);
        this.router.get('/subreddit', this.getSubredditKeywords);
    }
}
exports.RedditRouter = RedditRouter;
// Create the RedditRouter, and export its configured Express.Router
const redditRoutes = new RedditRouter();
redditRoutes.init();
exports.default = redditRoutes.router;
