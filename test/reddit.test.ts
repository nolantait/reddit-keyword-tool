import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/keywords/thread', () => {
  let thread = '/r/Futurology/comments/81gihs/in_2013_it_cost_330000_to_grow_a_hamburger_in_the/'

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/keywords/thread').query({thread: thread})
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include keywords', () => {
    return chai.request(app).get('/api/v1/keywords/thread').query({thread: thread})
      .then(res => {
        let Word = res.body.find(keyword => keyword.value === 'the');
        expect(Word).to.exist;
        expect(Word).to.have.all.keys([
          'value',
          'count'
        ]);
      });
  });

  it('should allow for a limit of returned items', () => {
    return chai.request(app).get('/api/v1/keywords/thread').query({thread: thread, limit: 10})
      .then(res => {
        expect(res.body.length).to.equal(10);
      });
  });
});

describe('GET api/v1/keywords/subreddit', () => {
  let subreddit = 'Futurology'

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/keywords/subreddit').query({subreddit: subreddit})
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include keywords', () => {
    return chai.request(app).get('/api/v1/keywords/subreddit').query({subreddit: subreddit})
      .then(res => {
        let Word = res.body[0];
        console.log(res.body);
        expect(Word).to.exist;
        expect(Word).to.have.all.keys([
          'value',
          'count'
        ]);
      });
  });

  it('should allow for a limit of returned items', () => {
    return chai.request(app).get('/api/v1/keywords/subreddit').query({subreddit: subreddit, limit: 10})
      .then(res => {
        expect(res.body.length).to.equal(10);
      });
  });
});
