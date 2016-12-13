'use strict';
/**
 * A set of functions called "actions" for `User`
 */
var MD5 = require("crypto-js/md5");
var redis = require('redis');
var client = redis.createClient();
var _ = require('lodash');

module.exports = {

  checkName: function * () {
    const ctx = this;
    try {
      let username = ctx.request.body.username;
      if (username ) {
        let user = yield strapi.services.user.findByU_P({
          username: username
        });
        if (_.isNull(user)){
          ctx.body = '';
          return ctx;
        }
      }
      } catch (err) {
        ctx.status = 400;
        ctx.body = err;
      }
      ctx.status = 400;
      ctx.body = "Username is exit";
      return ctx;
  },

  login: function * () {
      const ctx = this;
      try {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let remember = ctx.request.body.remember;
        if (username && password ) {
          let user = yield strapi.services.user.findByU_P({
            username: username,
            password: MD5(password).toString()
          });
          if (user && user.username ){
            let token = MD5(new Date() +  user.username).toString();
            ctx.body = {username: user.username, token: token};
            client.hmset(token, user);
            if (!remember) {
              client.expire(token, 1800);
            }
            return ctx;
          }
        }
        } catch (err) {
          ctx.status = 403;
          ctx.body = err;
        }
        ctx.status = 403;
        ctx.body = "Wrong username or password!";
        return ctx;
  },
  loadAuth: function * () {
        const ctx = this;
        let isAuthencation = false;
        try {
          let userCookie = ctx.cookies.get("session_user");
          if (userCookie ) {
            let user = JSON.parse(decodeURIComponent(userCookie));
            if (user && user.token ){
              let obj = yield new Promise(function(resolve, reject) {
                   client.hgetall(user.token, function(error, object) {
                    if(object) {
                      resolve(object);
                    }
                    if(error) {
                      reject(error);
                    }
                });
              });
              if (obj && obj.username) {
                ctx.body = user;
                return ctx;
                }
              }
            }
          } catch (err) {
            ctx.status = 403;
            ctx.body = err;
          }
        ctx.body = {error: "NotFound!"};
        return ctx;
  },

  logout: function * () {
    const ctx = this;
    try {
      let userCookie = ctx.cookies.get("session_user");
      if (userCookie ) {
        let user = JSON.parse(decodeURIComponent(userCookie));
        if (user && user.token ){
          let obj = yield new Promise(function(resolve, reject) {
               client.del(user.token, function(error, object) {
                if(object) {
                  resolve(object);
                }
                if(error) {
                  reject(error);
                }
            });
          });
        }
      }
      ctx.body = {};
    } catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
    return ctx;
  },

  /**
   * Get user entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    try {
      this.body = yield strapi.services.user.fetchAll(this.query);
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Get a specific user.
   *
   * @return {Object|Array}
   */

  findOne: function * () {
    try {
      this.body = yield strapi.services.user.fetch(this.params)
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Create a/an user entry.
   *
   * @return {Object}
   */

  create: function * () {
    let ctx = this;
    let data = ctx.request.body;
    try {
      if (data.username && data.password && _.isEqual(data.password, data.rePassword) ) {
        let user =  {
          username: data.username,
          password: MD5(data.password).toString(),
          active: true
        }
        user = yield strapi.services.user.add(user);
        if (user && user.username) {
          user.password = data.password;
          ctx.body = user;
          return ctx;
        }
      }
    } catch (err) {
      console.log(err);
      ctx.status = 400;
      ctx.body = "Error when create user, contact admin! Please"
      return ctx;
    }
    ctx.body = "Server not accep!"
    ctx.status = 400;
    return ctx;

  },

  /**
   * Update a/an user entry.
   *
   * @return {Object}
   */

  update: function * () {
    try {
      this.body = yield strapi.services.user.edit(this.params, this.request.body) ;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Destroy a/an user entry.
   *
   * @return {Object}
   */

  destroy: function * () {
    try {
      this.body = yield strapi.services.user.remove(this.params);
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Add relation to a specific user.
   *
   * @return {Object}
   */

  createRelation: function * () {
    try {
      this.body = yield strapi.services.user.addRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  },

  /**
   * Update relation to a specific user.
   *
   * @return {Object}
   */

  updateRelation: function * () {
    try {
      this.body = yield strapi.services.user.editRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  },

  /**
   * Destroy relation to a specific user.
   *
   * @return {Object}
   */

  destroyRelation: function * () {
    try {
      this.body = yield strapi.services.user.removeRelation(this.params, this.request.body);
    } catch (err) {
      this.status = 400;
      this.body = err;
    }
  }
};
