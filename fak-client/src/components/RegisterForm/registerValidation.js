import memoize from 'lru-memoize';
import {createValidator, required, maxLength, match} from 'utils/validation';

const validate = createValidator({
  username: [required, maxLength(100)],
  password: [required, maxLength(100)],
  rePassword: [match('password')]
});
export default memoize(10)(validate);

export const asyncValidate = (values) => {
  const client = global.apiClient;
  return new Promise((resolve, reject)=> {
    if (client) {
      client.post('/strapi/checkName', {
        data: {username: values.username}
      }).then(
        () => resolve(),
        () => reject({username: 'Username is exit'})
      )
    }else {
      reject({username: 'Client not found!'});
    }
  });
}
