import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage } from 'formik';
import { FormFields, FormFieldsSchema } from "@shared/schemas/FormFields.schema"
import { ServerErrorSchema } from "@shared/schemas/ServerError.schema"
import styles from './Form.module.css'
import { useState } from 'react';

type FieldProps = { isInvalid: boolean } & React.InputHTMLAttributes<HTMLInputElement>

const Field = ({ title, type, name, isInvalid, ...htmlAttrbs }: FieldProps) => {
  const errorCls = isInvalid ? styles.error : ''

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>{title}</label>
      <FormikField className={errorCls} id={name} type={type} name={name} role="input" {...htmlAttrbs} />
      <ErrorMessage name={name ?? ''}>
        {msg => <p role="alert" className={styles.errorMessage}>{msg}</p>}
      </ErrorMessage>
    </div>
  )
}

type FormStatus = "idle" | "pending" | "success" | "error"



export const Form = () => {
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (data: FormFields) => {
    setStatus("pending")

    try {
      const response = await fetch('http://localhost:3000/', {
        method: "POST",
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Something went wrong :(")
      }

      setStatus("success")
    } catch (err) {
      const { message } = await ServerErrorSchema.validate(err)
      console.error(message)
      setStatus('error')
    }
  }

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', eventDate: '' }}
      validationSchema={FormFieldsSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, setFieldTouched, errors, touched, handleChange }) => {
        const handleBlur = (field: keyof FormFields) => (e: React.FocusEvent<HTMLInputElement>) => {
          setFieldValue(field, e.target.value.trim())
        }
        const onChange = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldTouched(field)
          handleChange(e)
        }
        const getFieldProps = (field: keyof FormFields) => ({
          onBlur: handleBlur(field),
          isInvalid: Boolean(errors[field] && touched[field]),
          onChange: onChange(field),
          disabled: isSubmitting
        })


        return (
          <FormikForm className={styles.form}>
            <Field title="First name" name="firstName" placeholder="John" {...getFieldProps('firstName')} />
            <Field title="Last name" name="lastName" placeholder="Doe" {...getFieldProps('lastName')} />
            <Field type="email" title="Email" placeholder="johndoe@example.com" name="email" {...getFieldProps('email')} />
            <Field type="date" title="Event date" name="eventDate" {...getFieldProps('eventDate')} />

            <button className={styles.button} type="submit" disabled={isSubmitting}>Submit</button>
          </FormikForm>
        )
      }}
    </Formik>
  )
}
