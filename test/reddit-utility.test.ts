import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import RedditUtility from '../src/RedditUtility';

chai.use(chaiHttp);
const expect = chai.expect;

describe('RedditUtility', () => {
  describe('#retrieveThreads', () => {
    it('responds with an array of strings', (done) => {
      RedditUtility.retrieveThreads('funny', 5)
        .then(function(data) { 
          expect(data).to.be.an('array');
          expect(data[0]).to.be.a('string');
          done();
        });
    });
  });

  describe('#retrieveComents', () => {
    let thread = '/r/funny/comments/8107wa/the_guy_in_red_and_blue_is_a_magnet_for_trouble/';

    it('responds with an array of strings', (done) => {
      RedditUtility.retrieveComments(thread)
        .then(function(data) { 
          expect(data).to.be.an('array');
          expect(data[0]).to.be.a('string');
          done();
        });
    });
  });

  describe('#subredditUrl', () => {
    it('responds with a url', () => {
      expect(RedditUtility.subredditUrl('funny')).to.be.an('string');
    });
  });

  describe('#getWordListForThread', () => {
    let thread = '/r/funny/comments/8107wa/the_guy_in_red_and_blue_is_a_magnet_for_trouble/';

    it('returns an array of Words', (done) => {
      RedditUtility.getWordListForThread(thread).then(function(response) {
        expect(response).to.be.an('array');
        expect(response[0]).to.have.all.keys ([
          'value',
          'count'
        ])
        done();
      })
    });
  });

  describe('#getWordListForSubreddit', () => {
    let subreddit = 'funny'

    it('returns an array of Words', (done) => {
      RedditUtility.getWordListForSubreddit(subreddit).then(function(response) {
        expect(response).to.be.an('array');
        expect(response[0]).to.have.all.keys ([
          'value',
          'count'
        ])
        expect(response.length).to.be.greaterThan(2);
        done();
      })
    });
  });
});
