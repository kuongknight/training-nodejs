import memoize from 'lru-memoize';
import {createValidator, required, maxLength, integer} from 'utils/validation';

const validate = createValidator({
  name: [required, maxLength(100)],
  title: [required, maxLength(100)],
  totalPage: [integer]
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
