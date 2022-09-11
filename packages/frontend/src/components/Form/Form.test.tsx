import '@testing-library/jest-dom'
import keyboard from "@testing-library/user-event"
import { FormFields } from '@shared/schemas/FormFields.schema'
import { MOCKED_VALID_FORM_VALUES } from '@shared/mocks/validFormValues'
import { WHITESPACE, EMPTY_STRING } from '@shared/mocks/invalidValues'
import { ERROR_MESSAGES } from 'frontend/src/mocks/errorMessages'
import { render, screen, userEvent, waitFor } from '../../utils/testingLibrarySetup'
import { Form } from './Form'

const expectErrorMessageToBeNull = () => {
  const errorMessageElement = screen.queryByRole('alert')
  expect(errorMessageElement).toBeNull()
}

const expectErrorMessageToExist = (errorMessage: keyof typeof ERROR_MESSAGES) => {
  const errorMessageElement = screen.getByRole<HTMLParagraphElement>('alert')
  expect(errorMessageElement.textContent).toBe(ERROR_MESSAGES[errorMessage])
}

const expectFieldToBeFilledCorrectly = async (text: string, key: keyof FormFields) => {
  const input = screen.getByLabelText<HTMLInputElement>(text)

  await userEvent.type(input, MOCKED_VALID_FORM_VALUES[key])
  expect(input.value).toBe(MOCKED_VALID_FORM_VALUES[key])
}

const expectFieldToBeFilledIncorrectly = async (text: string, key: keyof FormFields) => {
  const input = screen.getByLabelText<HTMLInputElement>(text)

  await keyboard.type(input, WHITESPACE)
  expect(input.value).toBe(WHITESPACE)

  expectErrorMessageToExist("WHITESPACE")

  await keyboard.clear(input)
  expect(input.value).toBe(EMPTY_STRING)

  expectErrorMessageToExist("REQUIRED")
}


describe('Form component', () => {
  describe('should fill the form with the valid values and submit it with the success message', () => {

    it('should fill the first name input', async () => {
      await expectFieldToBeFilledCorrectly('First name', 'firstName')
      expectErrorMessageToBeNull()
    })
    it('should fill the last name input', async () => {
      await expectFieldToBeFilledCorrectly('Last name', 'lastName')
      expectErrorMessageToBeNull()
    })
    it('should fill the email input', async () => {
      await expectFieldToBeFilledCorrectly('Email', 'email')
      expectErrorMessageToBeNull()
    })
    it('should fill the event date input', async () => {
      await expectFieldToBeFilledCorrectly('Event date', 'eventDate')
      expectErrorMessageToBeNull()
    })
  })

  describe('should fill the form with the incorrect values and show the errors', () => {

  it('should fill the form with the incorrect values and show the errors', async () => {
    render(<Form />)

    it('should fill the first name input', async () => {
      await expectFieldToBeFilledIncorrectly('First Name', 'firstName')
    })

    it('should fill the second name input', async () => {
      await expectFieldToBeFilledIncorrectly("Last name", "lastName")
    })
    it('should fill the email input', async () => {
      await expectFieldToBeFilledCorrectly('Email', 'email')
    })
    it('should fill the event date input', async () => {
      await expectFieldToBeFilledCorrectly('Event date', 'eventDate')
    })
  })

  it('should show the error messages when the submit button is clicked', async () => {
    render(<Form />)

    const submitButton = screen.getByText('Submit')
    await userEvent.click(submitButton)

    const errorMessageElements = screen.getAllByRole('alert')
    const inputs = screen.getAllByRole('input')

    expect(errorMessageElements.length).toBe(inputs.length)

    errorMessageElements.forEach(element => {
      expect(element.textContent).toBe(ERROR_MESSAGES.REQUIRED)
    })

  })
})
