import memoize from 'lru-memoize';
import {createValidator, required, maxLength, integer} from 'utils/validation';

const bookValidation = createValidator({
  name: [required, maxLength(100)],
  title: [required, maxLength(100)],
  year: integer,
  authorId: integer
});
export default memoize(10)(bookValidation);
