import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import WordList from '../src/WordList';

chai.use(chaiHttp);
const expect = chai.expect;

const arrayOfWords = ["dog", "dog", "cat", "bird"];

describe('#update_raw_text', () => {
  let list = new WordList
  it('updates an array of strings', () => {
    list.update_text(arrayOfWords);
    expect(list.raw_text).to.eql(arrayOfWords);
  });
});


describe('#generateWords', () => {
  let list = new WordList(arrayOfWords)
  it('returns an array of Words', () => {
    expect(list.generateWords()).to.be.an('array')
  });
});
