var path = require('path')
var libDir = path.join(__dirname, '../lib')
require('app-module-path').addPath(libDir);

var EmailTemplate = require('email-templates').EmailTemplate
var templateDir = path.join(__dirname, '../templates', 'active-account')

var newsletter = new EmailTemplate(templateDir)
var user = {username: 'Joe', token: 'spaghetti'}
newsletter.render({user}, function (err, result) {
  console.log(result);
  console.log(err);
})
