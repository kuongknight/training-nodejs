import memoize from 'lru-memoize';
import {createValidator, required, maxLength, integer} from 'utils/validation';

const validate = createValidator({
  name: [required, maxLength(100)],
  title: [required, maxLength(100)],
  year: [integer],
  authorId: [integer]
});
export default memoize(10)(validate);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values /* , dispatch */ ) => {
  return sleep(2000) // simulate server latency
    .then(() => {
      if ([ 'admin@admin.com', 'kuong@admin.com' ].includes(values.email)) {
        throw new Error({ username: 'That username is taken' })
      }
    })
}
