import Domain from '../models/domain.model';

/**
 * Load domain and append to req.
 */
function load(req, res, next, id) {
  Domain.get(id)
    .then((domain) => {
      req.domain = domain; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get domain
 * @returns {Domain}
 */
function get(req, res) {
  Domain.get(req.params.domainId)
    .then(domain => res.json(domain))
    .catch(e => next(e));
}

/**
 * Create new domain
 * @property {string} req.body.name - The name of domain.
 * @property {string} req.body.type - The type of domain.
 * @returns {Domain}
 */
function create(req, res, next) {
  const domain = new Domain({
    name: req.body.name,
    type: req.body.type
  });

  domain.save()
    .then(savedDomain => res.json(savedDomain))
    //.catch(e => next(e));
    .catch(e => next(e));
}

/**
 * Update existing domain
 * @property {string} req.body.name - The name of domain.
 * @property {string} req.body.type - The type of domain.
 * @returns {Domain}
 */
function update(req, res, next) {
  const domain = req.domain;
  domain.name = req.body.name;
  domain.type = req.body.type;

  domain.save()
    .then(savedDomain => res.json(savedDomain))
    .catch(e => next(e));
}

/**
 * Get domain list.
 * @property {number} req.query.skip - Number of domains to be skipped.
 * @property {number} req.query.limit - Limit number of domains to be returned.
 * @returns {Domain[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Domain.list({ limit, skip })
    .then(domains => res.json(domains))
    .catch(e => next(e));
}

/**
 * Delete domain.
 * @returns {Domain}
 */
function remove(req, res, next) {
  const domain = req.domain;
  domain.active = false;

  domain.save()
    .then(savedDomain => res.json(savedDomain))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
