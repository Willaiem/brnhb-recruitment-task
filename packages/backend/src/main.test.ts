import { Response } from 'light-my-request'
import { ServerSuccessSchema } from '@shared/schemas/ServerSuccess.schema'
import { ServerErrorSchema } from '@shared/schemas/ServerError.schema'
import { EMPTY_STRING, WHITESPACE } from '@shared/mocks/invalidValues'
import { MOCKED_VALID_FORM_VALUES } from '@shared/mocks/validFormValues'
import { SERVER_SUCCESS_RESPONSE, SERVER_ERROR_RESPONSE } from '@shared/mocks/serverResponses'
import { app } from './main'


const expectSuccessResponse = async (response: Response) => {
  expect(response.statusCode).toBe(200)

  const serverSuccess = ServerSuccessSchema.validate(JSON.parse(response.payload))
  await expect(serverSuccess).resolves.toEqual(SERVER_SUCCESS_RESPONSE)
}

const expectErrorResponse = async (response: Response) => {
  expect(response.statusCode).toBe(500)

  const serverError = ServerErrorSchema.validate(JSON.parse(response.payload))
  await expect(serverError).resolves.toEqual(SERVER_ERROR_RESPONSE)
}

describe('API', () => {
  it('should return the success object with HTTP injection', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      payload: MOCKED_VALID_FORM_VALUES
    })

    await expectSuccessResponse(response)
  })

  describe('should return the error object with HTTP injection', () => {
    describe('when firstName', () => {
      it('is empty string', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            firstName: EMPTY_STRING,
          }
        })

        await expectErrorResponse(response)
      })
      it('is white space', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            firstName: WHITESPACE,
          }
        })

        await expectErrorResponse(response)
      })
    })

    describe('when lastName', () => {
      it('is empty string', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            lastName: EMPTY_STRING,
          }
        })

        await expectErrorResponse(response)
      })
      it('is white space', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            lastName: WHITESPACE,
          }
        })

        await expectErrorResponse(response)
      })
    })

    describe('when email', () => {
      it('is empty string', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            email: EMPTY_STRING,
          }
        })

        await expectErrorResponse(response)
      })
      it('is white space', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            email: WHITESPACE,
          }
        })

        await expectErrorResponse(response)
      })
    })

    describe('when eventDate', () => {
      it('is empty string', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            eventDate: EMPTY_STRING,
          }
        })

        await expectErrorResponse(response)
      })
      it('is white space', async () => {
        const response = await app.inject({
          method: "POST",
          url: '/',
          payload: {
            eventDate: WHITESPACE,
          }
        })

        await expectErrorResponse(response)
      })
    })

  })
})
