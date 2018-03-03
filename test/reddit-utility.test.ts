import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import RedditUtility from '../src/RedditUtility';

chai.use(chaiHttp);
const expect = chai.expect;

describe('#retreiveThreads', () => {

  it('responds with an array of post IDs', (done) => {
    RedditUtility.retreiveThreads('funny', 5)
      .then(function(data) { 
        expect(data).to.be.an('array');
        done();
      });
  });
});

describe('#retreiveComents', () => {

  it('responds with an array of post IDs', (done) => {
    RedditUtility.retreiveComments('/r/funny/comments/8107wa/the_guy_in_red_and_blue_is_a_magnet_for_trouble/')
      .then(function(data) { 
        expect(data).to.be.an('array');
        done();
      });
  });
});

describe('#subredditUrl', () => {
  it('responds with a url', () => {
    expect(RedditUtility.subredditUrl('funny')).to.be.an('string');
  });
});

describe('#compressArray', () => {
  it('returns an array of Words', () => {
    let arrayOfWords = ["dog", "dog", "cat", "bird"]
    let compressedArray = RedditUtility.compressArray(arrayOfWords);
    expect(compressedArray).to.be.an('array');
    expect(compressedArray[0].count).to.equal(2);
  });
});


describe('#getWordListFor', () => {
  it('returns an array of Words', (done) => {
    RedditUtility.getWordListFor('/r/funny/comments/8107wa/the_guy_in_red_and_blue_is_a_magnet_for_trouble/').then(function(response) {
      expect(response).to.be.an('array');
      done();
    })
  });
});

