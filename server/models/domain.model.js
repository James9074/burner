import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Domain Schema
 */

 const DomainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unqiue: true
  },
  type: {
    type: String, //Can be one of ['burner, malicious, whitelisted, bofa']
    required: true
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true // If false, this domain was effectively deleted.
  },
  updated_at: {type: String }
}, { timestamps: true });

/**
 * Methods
 */
DomainSchema.method({
});

/**
 * Statics
 */
DomainSchema.statics = {
  /**
   * Get domain
   * @param {ObjectId} id - The objectId of domain.
   * @returns {Promise<Domain, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((domain) => {
        if (domain) {
          return domain;
        }
        const err = new APIError('No such domain exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List domains in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of domains to be skipped.
   * @param {number} limit - Limit number of domains to be returned.
   * @returns {Promise<Domain[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Domain
 */
export default mongoose.model('Domain', DomainSchema);
