import { string } from 'yup';
import { preparedIsEmptyString } from './preparedTests';

export const getPreparedStringSchema = () => {
  return string().required('This field is required').test(preparedIsEmptyString)
}
