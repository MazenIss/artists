const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const fs = require("fs");

const expect = chai.expect;

chai.use(chaiHttp);

describe('Artist Controller', () => {
  it('should search for an artist by name and return 200 + CSV file', async () => {
    const res = await chai
      .request(app)
      .get('/artist')
      .send({ artist_name: 'mazen mar', file_name: 'test' });

    expect(res).to.have.status(200);
    const fileExists = fs.existsSync('csv/test.csv');
    if (fileExists) {
        fs.unlinkSync('csv/test.csv');
      }
  }).timeout(5000);

  it('should return a random artists list', async () => {
    const res = await chai
      .request(app)
      .get('/artist')
      .send({ artist_name: 'mazen kbefbfibej', file_name: 'test' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('artists').that.is.an('array');
    
  });

  it('should handle a filename containing symbols and return an error', async () => {
    const res = await chai
      .request(app)
      .get('/artist')
      .send({ artist_name: 'mazen', file_name: 'test@' });

    expect(res).to.have.status(400);
    
  });

  
});
