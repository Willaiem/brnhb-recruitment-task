import { MOCKED_VALID_FORM_VALUES } from '@shared/mocks/validFormValues'
import { WHITESPACE } from '@shared/mocks/invalidValues'
import { ERROR_MESSAGES } from 'frontend/src/mocks/errorMessages'

describe('App ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should fill the form with the valid values', () => {
    cy.get("input#firstName").type(MOCKED_VALID_FORM_VALUES.firstName)
    cy.get('body').then(bodyEl => {
      const isErrorMessageInBody = bodyEl.find('[role=alert]').length > 0
      expect(isErrorMessageInBody).to.be.false
    })

    cy.get("input#lastName").type(MOCKED_VALID_FORM_VALUES.lastName)
    cy.get('body').then(bodyEl => {
      const isErrorMessageInBody = bodyEl.find('[role=alert]').length > 0
      expect(isErrorMessageInBody).to.be.false
    })

    cy.get("input#email").type(MOCKED_VALID_FORM_VALUES.email)
    cy.get('body').then(bodyEl => {
      const isErrorMessageInBody = bodyEl.find('[role=alert]').length > 0
      expect(isErrorMessageInBody).to.be.false
    })


    cy.get("input#eventDate").type(MOCKED_VALID_FORM_VALUES.eventDate)
    cy.get('body').then(bodyEl => {
      const isErrorMessageInBody = bodyEl.find('[role=alert]').length > 0
      expect(isErrorMessageInBody).to.be.false
    })
  })

  it('should fill the form with the invalid values', () => {
    cy.get("input#firstName").type(WHITESPACE)
    cy.get('body').then(bodyEl => {
      const errorMessageEl = bodyEl.find('input#firstName + [role=alert]')
      expect(errorMessageEl.text()).to.be.eq(ERROR_MESSAGES.WHITESPACE)
    })

    cy.get("input#lastName").type(WHITESPACE)
    cy.get('body').then(bodyEl => {
      const errorMessageEl = bodyEl.find('input#lastName + [role=alert]')
      expect(errorMessageEl.text()).to.be.eq(ERROR_MESSAGES.WHITESPACE)
    })


    cy.get("input#email").type(MOCKED_VALID_FORM_VALUES.firstName)
    cy.get('body').then(bodyEl => {
      const errorMessageEl = bodyEl.find('input#email + [role=alert]')
      expect(errorMessageEl.text()).to.be.eq(ERROR_MESSAGES.INVALID_EMAIL)
    })

    cy.get('input#eventDate')
      .type(MOCKED_VALID_FORM_VALUES.eventDate)
      .clear()
    cy.get('body').then(bodyEl => {
      const errorMessageEl = bodyEl.find('input#eventDate + [role=alert]')
      expect(errorMessageEl.text()).to.be.eq(ERROR_MESSAGES.REQUIRED)
    })
  })

  it('should show the error messages when submit button is clicked', () => {
    cy.get('button').click()

    cy.get('[role=alert]').each(errorMessageEl => {
      expect(errorMessageEl.text()).to.be.eq(ERROR_MESSAGES.REQUIRED)
    })
  })
})
