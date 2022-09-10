import { TestConfig } from 'yup';
import isEmail from 'validator/es/lib/isEmail'

const createYupTest = <T,>({ isValidFn, message }: { isValidFn: (value: T) => boolean, message: string }): TestConfig<T | undefined> => ({
  test: (value) => value !== undefined && isValidFn(value),
  message
})


export const preparedIsEmptyString = createYupTest<string>({
  isValidFn: (text) => text.trim().length > 0,
  message: 'This field cannot contain only whitespace characters'
})

export const preparedIsValidDateTest = createYupTest<string>({
  isValidFn: (date) => new Date(date).toString() !== 'Invalid Date',
  message: "Invalid date - pick the correct one"
})

export const preparedIsValidEmailTest = createYupTest<string>({
  isValidFn: email => isEmail(email),
  message: "Invalid email - valid one: john@example.com"
})
