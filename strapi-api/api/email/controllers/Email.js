'use strict';

/**
 * A set of functions called "actions" for `Email`
 */

module.exports = {
  /**
   * Get email entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    try {
      this.body = yield strapi.services.email.fetchAll(this.query);
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Get a specific email.
   *
   * @return {Object|Array}
   */

  findOne: function * () {
    try {
      this.body = yield strapi.services.email.fetch(this.params)
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Create a/an email entry.
   *
   * @return {Object}
   */

  create: function * () {
    try {
      this.body = yield strapi.services.email.add(this.request.body);
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Update a/an email entry.
   *
   * @return {Object}
   */

  update: function * () {
    try {
      this.body = yield strapi.services.email.edit(this.params, this.request.body) ;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Destroy a/an email entry.
   *
   * @return {Object}
   */

  destroy: function * () {
    try {
      this.body = yield strapi.services.email.remove(this.params);
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Add relation to a specific email.
   *
   * @return {Object}
   */

  createRelation: function * () {
    try {
      this.body = yield strapi.services.email.addRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  },

  /**
   * Update relation to a specific email.
   *
   * @return {Object}
   */

  updateRelation: function * () {
    try {
      this.body = yield strapi.services.email.editRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  },

  /**
   * Destroy relation to a specific email.
   *
   * @return {Object}
   */

  destroyRelation: function * () {
    try {
      this.body = yield strapi.services.email.removeRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  }
};
