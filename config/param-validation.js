import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      emailAddress: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      emailAddress: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // CREATE /api/domains
  createDomain: {
    body: {
      name: Joi.string().required(),
      type: Joi.string().required()
    }
  },

  // UPDATE /api/domains/:domainId
  updateDomain: {
    body: {
      name: Joi.string().required(),
      type: Joi.string().required()
    },
    params: {
      domainId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
