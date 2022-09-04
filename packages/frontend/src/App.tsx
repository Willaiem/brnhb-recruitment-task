import { useForm, RegisterOptions, FieldError, UseFormRegisterReturn } from "react-hook-form";
import isEmail from 'validator/es/lib/isEmail';
import './App.css'

type FormFields = {
  name: string
  surname: string
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

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FormFields) => {
    console.log(data)
  }

  const fieldRegister = (name: keyof FormFields, config: RegisterOptions) => {
    return {
      ...register(name, config),
      error: errors[name]
    }
  }

  const defaultOptions = getConfiguredOptions()

  const validateEmail = (email: string) => isEmail(email) || 'Invalid email - valid one: john@example.com'
  const emailOptions = getConfiguredOptions({ validate: { isEmail: validateEmail } })

  const validateDate = (stringifiedDate: string) => {
    const date = new Date(stringifiedDate)

    const isInvalidDate = date.toString() === "Invalid Date"
    const isYearTooUnrealistic = date.getFullYear() < 1900 || date.getFullYear() > 2100
    if (isInvalidDate) {
      return "Invalid date - pick the correct one"
    }
    if (isYearTooUnrealistic) {
      return "Invalid date - the year seems too unrealistic for this event."
    }

    return true
  }
  const dateOptions = getConfiguredOptions({ validate: { isValidDate: validateDate } })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field title="Name" options={fieldRegister("name", defaultOptions)} />
      <Field title="Surname" options={fieldRegister("surname", defaultOptions)} />
      <Field title="Email" type="email" options={fieldRegister("email", emailOptions)} />
      <Field title="Event date" type="date" options={fieldRegister("date", dateOptions)} />
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
