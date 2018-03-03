import {Router, Request, Response, NextFunction} from 'express';
import RedditUtility from '../RedditUtility';
const Keywords = require('../data');

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
  public getKeywords(req: Request, res: Response, next: NextFunction) {
    RedditUtility.getWordListFor(req.query.thread)
      .then(data => res.send(data.slice(0, 9)));
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getKeywords);
  }

}

// Create the RedditRouter, and export its configured Express.Router
const redditRoutes = new RedditRouter();
redditRoutes.init();

export default redditRoutes.router;
