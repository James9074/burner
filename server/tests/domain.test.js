import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Domain APIs', () => {
  let domain = {
    name: 'mailinators.com',
    type: 'burner'
  };

  describe('# POST /api/domains', () => {
    it('should create a new domain', (done) => {
      request(app)
        .post('/api/domains')
        .send(domain)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(domain.name);
          expect(res.body.type).to.equal(domain.type);
          domain = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/domains/:domainId', () => {
    it('should get domain details', (done) => {
      request(app)
        .get(`/api/domains/${domain._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(domain.name);
          expect(res.body.type).to.equal(domain.type);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when domain does not exists', (done) => {
      request(app)
        .get('/api/domains/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/domains/:domainId', () => {
    it('should update domain details', (done) => {
      domain.name = 'mail.com';
      request(app)
        .put(`/api/domains/${domain._id}`)
        .send(domain)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('mail.com');
          expect(res.body.type).to.equal(domain.type);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/domains/', () => {
    it('should get all domains', (done) => {
      request(app)
        .get('/api/domains')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all domains (with limit and skip)', (done) => {
      request(app)
        .get('/api/domains')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/domains/', () => {
    it('should delete domain', (done) => {
      request(app)
        .delete(`/api/domains/${domain._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('mail.com');
          expect(res.body.active).to.equal(false);
          done();
        })
        .catch(done);
    });
  });
});
