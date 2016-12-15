var path = require('path')
var libDir = path.join(__dirname, '../lib')
require('app-module-path').addPath(libDir);

var EmailTemplate = require('email-templates').EmailTemplate
var templateDir = path.join(__dirname, '../templates', 'active-account')

var newsletter = new EmailTemplate(templateDir)
var user = {name: 'Joe', pasta: 'spaghetti'}
newsletter.render(user, function (err, result) {
  console.log(result);
  console.log(err);
})

const sender =  new Promise(function(resolve,reject) {
  console.log(user);
  newsletter.render(user,function(error, result){
    console.log('error: ', error);
    console.log('result: ', result);
    if (result) {
      console.log(result);
      resolve(result)
    }
    if (error) {
      console.log(error);
      reject(error)
    }
  })
});
sender.then(
  function(result) {
    console.log(result);
  },
  function(error) {
    console.log(error);
  }
)
