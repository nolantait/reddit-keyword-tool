import {Router, Request, Response, NextFunction} from 'express';
import RedditUtility from '../RedditUtility';

export class RedditRouter {
  router: Router

  /**
   * Initialize the RedditRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Keywords.
   */
  public getThreadKeywords(req: Request, res: Response, next: NextFunction) {
    RedditUtility.getWordListForThread(req.query.thread)
      .then(function(data) { 
        let limit = req.query.limit;
        if (!limit) {
          limit = data.length;
        }
        res.send(data.slice(0, limit))
      });
  }

  public getSubredditKeywords(req: Request, res: Response, next: NextFunction) {
    RedditUtility.getWordListForSubreddit(req.query.subreddit)
      .then(function(data) { 
        let limit = req.query.limit;
        if (!limit) {
          limit = data.length;
        }
        res.send(data.slice(0, limit))
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

// Create the RedditRouter, and export its configured Express.Router
const redditRoutes = new RedditRouter();
redditRoutes.init();

export default redditRoutes.router;
