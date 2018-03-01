import {Router, Request, Response, NextFunction} from 'express';
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
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Keywords);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
  }

}

// Create the RedditRouter, and export its configured Express.Router
const redditRoutes = new RedditRouter();
redditRoutes.init();

export default redditRoutes.router;
