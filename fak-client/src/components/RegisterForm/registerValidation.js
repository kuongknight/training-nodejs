import memoize from 'lru-memoize';
import {createValidator, required, maxLength, match, email} from 'utils/validation';

const validate = createValidator({
  username: [required, maxLength(100)],
  password: [required, maxLength(100)],
  rePassword: [match('password')],
  email: [required, email]
});
export default memoize(10)(validate);

export const asyncValidate = (values) => {
  const client = global.apiClient;
  const data = {};
  if (values.username) {
    data.username = values.username;
  }
  if (values.email) {
    data.email = values.email
  }
  return new Promise((resolve, reject)=> {
    if (client) {
      client.post('/strapi/checkName', {
        data: data
      }).then(
        () => resolve(),
        (error) =>reject(error)
      )
    }else {
      reject({username: 'Client not found!'});
    }
  });
}
