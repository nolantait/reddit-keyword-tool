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
    if (req.query.thread) {
      RedditUtility.getWordListForThread(req.query.thread)
        .then(function(data) { 
          let limit = req.query.limit;
          if (!limit) {
            limit = data.length;
          }
          res.send(data.slice(0, limit))
        })
        .catch(e => res.send('Something went wrong.'));
    } else {
      res.send('Missing thread in query: ?thread="/r/thread-link-here"');
    }
  }

  public getSubredditKeywords(req: Request, res: Response, next: NextFunction) {
    if (req.query.subreddit) {
      RedditUtility.getWordListForSubreddit(req.query.subreddit)
        .then(function(data) { 
          let limit = req.query.limit;
          if (!limit) {
            limit = data.length;
          }
          res.send(data.slice(0, limit))
        })
        .catch(e => res.send('Something went wrong.'));
    } else {
      res.send('Missing subreddit in query: ?subreddit="funny"');
    }
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
