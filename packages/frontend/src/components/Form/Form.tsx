import { useEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage, FormikProps } from 'formik';
import { FormFields, FormFieldsSchema } from "@shared/schemas/FormFields.schema"
import { parseError } from '@shared/utils/parseError'
import styles from './Form.module.css'

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

const useForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle')

  const initialValues = { firstName: '', lastName: '', email: '', eventDate: '' }

  useEffect(() => {
    if (status === "idle" || status === "pending") {
      return
    }

    const MS_TO_RESET_STATUS = 3000

    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      setStatus('idle')
    }, MS_TO_RESET_STATUS)

    return () => {
      clearTimeout(timeout)
    }
  }, [status])

  const onSubmit = async (data: FormFields) => {
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
      const { error, message } = parseError(err)
      console.error(`SERVER ERROR: \n MESSAGE: ${message} \n ERROR: ${error}`)
      setStatus('error')
    }
  }

  const getFormikConfig = (formikConfig: FormikProps<FormFields>) => {
    const { isSubmitting, setFieldValue, setFieldTouched, errors, touched, handleChange } = formikConfig

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

    return { getFieldProps }
  }

  return {
    formikProps: {
      onSubmit,
      initialValues
    },
    getFormikConfig,
    status
  }
}

export const Form = () => {
  const { formikProps, status, getFormikConfig } = useForm()

  return (
    <Formik
      {...formikProps}
      validationSchema={FormFieldsSchema}
    >
      {(formikProps) => {
        const { isSubmitting } = formikProps
        const { getFieldProps } = getFormikConfig(formikProps)

        return (
          <FormikForm className={styles.form}>
            <Field title="First name" name="firstName" placeholder="John" {...getFieldProps('firstName')} />
            <Field title="Last name" name="lastName" placeholder="Doe" {...getFieldProps('lastName')} />
            <Field type="email" title="Email" placeholder="johndoe@example.com" name="email" {...getFieldProps('email')} />
            <Field type="date" title="Event date" name="eventDate" {...getFieldProps('eventDate')} />

            <button className={styles.button} type="submit" disabled={isSubmitting}>Submit</button>

            <LoadingIndicator status={status} />
          </FormikForm>
        )
      }}
    </Formik>
  )
}

type LoadingIndicatorProps = {
  status: FormStatus
}

export const LoadingIndicator = ({ status }: LoadingIndicatorProps) => {
  return (
    <>
      {status === "pending" ? <p className={`${styles.indicator} ${styles.pending}`} role="loading">Adding - please wait...</p> : null}
      {status === "success" ? <p className={`${styles.indicator} ${styles.success}`} role="loading">Added successfully!</p> : null}
      {status === "error" ? <p className={`${styles.indicator} ${styles.error}`} role="loading">Something went wrong - please try again.</p> : null}
    </>
  )
}
