import { useForm as useRHF, RegisterOptions, FieldError, UseFormRegisterReturn } from "react-hook-form";
import isEmail from 'validator/es/lib/isEmail';
import './App.css'

type FormFields = {
  firstName: string
  lastName: string
  email: string
  date: string
}

type FieldProps = {
  title: string
  options: UseFormRegisterReturn<string> & {
    error?: FieldError
  }
} & React.InputHTMLAttributes<HTMLInputElement>

const Field = ({ title, options: { error, ...restOptions }, type }: FieldProps) => {
  return (
    <>
      <label htmlFor={type}>{title}</label>
      <input type={type} {...restOptions} />
      {error && <p>{error.message}</p>}
    </>
  )
}

const getConfiguredOptions = (customConfig?: RegisterOptions): RegisterOptions => ({
  required: 'This field is required',
  validate: {
    isEmpty: v => v.trim().length > 0 || 'This field cannot be empty',
    ...customConfig?.validate
  },
  ...customConfig
})

const validators = {
  date(stringifiedDate: string) {
    const date = new Date(stringifiedDate)
    const currentYear = date.getFullYear()

    const isInvalidDate = date.toString() === "Invalid Date"
    const isYearTooUnrealistic = currentYear < 1900 || currentYear > 2100
    if (isInvalidDate) {
      return "Invalid date - pick the correct one"
    }
    if (isYearTooUnrealistic) {
      return "Invalid date - the year seems too unrealistic for this event."
    }

    return true
  },
  email: (email: string) => isEmail(email) || 'Invalid email - valid one: john@example.com'
}

const useForm = () => {
  const { register, handleSubmit, formState: { errors } } = useRHF<FormFields>({
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  const fieldConfigs = {
    firstName: getConfiguredOptions(),
    lastName: getConfiguredOptions(),
    email: getConfiguredOptions({ validate: { isValidEmail: validators.email } }),
    date: getConfiguredOptions({ validate: { isValidDate: validators.date } }),
  }

  const fieldRegister = (name: keyof FormFields) => {
    return {
      ...register(name, fieldConfigs[name]),
      error: errors[name]
    }
  }

  return { register: fieldRegister, handleSubmit: onSubmit }
}


const Form = () => {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit}>
      <Field title="First name" options={register("firstName")} />
      <Field title="Last name" options={register("lastName")} />
      <Field title="Email" type="email" options={register("email")} />
      <Field title="Event date" type="date" options={register("date")} />
      <button>Submit</button>
    </form>
  )
}


export const App = () => {
  return (
    <main>
      <Form />
    </main>
  )
}
