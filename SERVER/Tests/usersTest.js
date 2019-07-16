/* eslint-disable eol-last */
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Seed from '../Models/seed';
import db from '../DBconfig/index';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

before(async () => {
  const Users = 'DELETE FROM users';
  await db.query(Users);
});

const signup = '/api/v1/auth/signup';

describe('POST /api/v1/auth/signup ', () => {
  it('should create a new user account', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.account)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if a user does not supply the required fields', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.incompleteFields)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply the required fields!');
        done();
      });
  });

  it('should return an error if the email supplied is invalid', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.invalidEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply a valid email!');
        done();
      });
  });

  it('should return an error if the firstname/ last name format supplied is wrong', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.noValidNames)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply valid name(s)!');
        done();
      });
  });

  it('should return an error if the phone number format supplied is wrong', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.noValidNumber)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Please, supply a valid phone number!');
        done();
      });
  });

  it('should return an error if the password format supplied is wrong', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.noValidPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Your password must be only 8 characters and must include at least an upper case letter, lower case letter, and a number.');
        done();
      });
  });

  it('should return an error if the email has been registered before', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.account)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res).to.have.status('409');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('OOPS! This particular email has already been registered!');
        done();
      });
  });
});

const signin = '/api/v1/auth/signin';

describe('POST /api/v1/auth/signin ', () => {
  it('should login a user', (done) => {
    request(app)
      .post(signin)
      .set('Accept', 'application/json')
      .send(Seed.signIn)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body.data).to.include.key('token');
        expect(res.body.data).to.include.key('user_id');
        expect(res.body.data).to.include.key('email');
        expect(res.body.data).to.include.key('first_name');
        expect(res.body.data).to.include.key('last_name');
        expect(res.body.data).to.include.key('password');
        expect(res.body.data).to.include.key('phone_number');
        expect(res.body.data).to.include.key('address');
        expect(res.body.data).to.include.key('is_admin');
        expect(res.body.data).to.include.key('registered');
        done();
      });
  });
  it("should return an error if email/password isn't supplied", (done) => {
    request(app)
      .post(signin)
      .set('Accept', 'application/json')
      .send(Seed.incompleteSignInDetails)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('No username or password!');
        done();
      });
  });
  it('should return an error if an invalid email is supplied', (done) => {
    request(app)
      .post(signin)
      .set('Accept', 'application/json')
      .send(Seed.wrongEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Wrong email!');
        done();
      });
  });
  it('should return an error if an invalid password is supplied', (done) => {
    request(app)
      .post(signin)
      .set('Accept', 'application/json')
      .send(Seed.wrongPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Wrong password!');
        done();
      });
  });
});
