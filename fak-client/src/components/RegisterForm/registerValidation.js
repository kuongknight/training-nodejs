import memoize from 'lru-memoize';
import {createValidator, required, maxLength, match} from 'utils/validation';

const validate = createValidator({
  username: [required, maxLength(100)],
  password: [required, maxLength(100)],
  rePassword: [match('password')]
});
export default memoize(10)(validate);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values /* , dispatch */ ) => {
  return sleep(2000) // simulate server latency
    .then(() => {
      if ([ 'fuck', 'bicht' ].includes(values.name)) {
        throw {name: 'That username is block' }
      }
    })
}
