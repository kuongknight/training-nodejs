import { EmailTemplate } from 'email-templates'
import path from 'path'

const activeEmailDir = path.join(__dirname, '../templates', 'active-account')
const activeEmail = new EmailTemplate(activeEmailDir)

const ActiveEmailGenerator = (user) => new Promise((resolve,reject) => {
  activeEmail.render(user, (err, result) => {
    if (result) {
      resolve({...result, to: user.email, createdBy: user.id})
    }
    if (err) {
      reject(err)
    }
  })
});
export default ActiveEmailGenerator;
