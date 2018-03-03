import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/keywords', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/keywords').query({thread: '/r/Futurology/comments/81gihs/in_2013_it_cost_330000_to_grow_a_hamburger_in_the/'})
      .then(res => {
        expect(res.status).to.equal(200);
        console.log(res);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should include keywords', () => {
    return chai.request(app).get('/api/v1/keywords').query({thread: '/r/Futurology/comments/81gihs/in_2013_it_cost_330000_to_grow_a_hamburger_in_the/'})
      .then(res => {
        let Word = res.body.find(keyword => keyword.value=== 'the');
        expect(Word).to.exist;
        expect(Word).to.have.all.keys([
          'value',
          'count'
        ]);
      });
  });

});
