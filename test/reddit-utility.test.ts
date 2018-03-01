import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import RedditUtility from '../src/RedditUtility';

chai.use(chaiHttp);
const expect = chai.expect;

describe('#retreiveComents', () => {

  it('responds with an array of post IDs', (done) => {
    RedditUtility.retreivePosts('funny', 5)
      .then(function(data) { 
        expect(data).to.be.an('array');
        done();
      });
  });
});

describe('#getUrl', () => {
  it('responds with a url', () => {
    expect(RedditUtility.getPostsUrl('funny')).to.be.an('string');
  });
});

