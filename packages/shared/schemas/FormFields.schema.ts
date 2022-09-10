import { InferType, object } from 'yup';
import { getPreparedStringSchema } from './preparedSchemas';
import { preparedIsValidDateTest, preparedIsValidEmailTest } from './preparedTests';

export const FormFieldsSchema = object({
  firstName: getPreparedStringSchema().min(2, "At least two characters are required"),
  lastName: getPreparedStringSchema(),
  email: getPreparedStringSchema().test(preparedIsValidEmailTest),
  eventDate: getPreparedStringSchema().test(preparedIsValidDateTest),
})

export type FormFields = InferType<typeof FormFieldsSchema>
