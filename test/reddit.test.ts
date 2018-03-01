import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/keywords', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/keywords')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.keywords).to.be.an('array');
      });
  });

  it('should include keywords', () => {
    return chai.request(app).get('/api/v1/keywords')
      .then(res => {
        let Keyword = res.body.keywords.find(keyword => keyword.text === 'fun');
        expect(Keyword).to.exist;
        expect(Keyword).to.have.all.keys([
          'text',
          'count'
        ]);
      });
  });

});
