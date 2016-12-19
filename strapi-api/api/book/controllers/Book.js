'use strict';

/**
 * A set of functions called "actions" for `Book`
 */

module.exports = {
  /**
   * Get book entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    try {
      console.log(strapi);
      this.body = yield strapi.services.book.fetchAll(this.query);
    } catch (err) {
      this.body = err;
    }
  },


  /**
   * Get a specific book.
   *
   * @return {Object|Array}
   */

  findOne: function * () {
    try {
      this.body = yield strapi.services.book.fetch(this.params)
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Create a/an book entry.
   *
   * @return {Object}
   */

  create: function * () {
    try {
      this.body =  yield strapi.services.book.add(this.request.body);
    } catch (err) {
      console.log(err);
      this.body = err;
    }
  },

  /**
   * Update a/an book entry.
   *
   * @return {Object}
   */

  update: function * () {
    try {
      this.body = yield strapi.services.book.edit(this.params, this.request.body) ;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Destroy a/an book entry.
   *
   * @return {Object}
   */

  destroy: function * () {
    try {
      this.body = yield strapi.services.book.remove(this.params);
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Add relation to a specific book.
   *
   * @return {Object}
   */

  createRelation: function * () {
    try {
      this.body = yield strapi.services.book.addRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  },

  /**
   * Update relation to a specific book.
   *
   * @return {Object}
   */

  updateRelation: function * () {
    try {
      this.body = yield strapi.services.book.editRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  },

  /**
   * Destroy relation to a specific book.
   *
   * @return {Object}
   */

  destroyRelation: function * () {
    try {
      this.body = yield strapi.services.book.removeRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  }
};
