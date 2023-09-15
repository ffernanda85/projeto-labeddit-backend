import { UserBusiness } from "../../../src/business/user/UserBusiness"
import { UserDatabaseMock } from "../../mocks/user/UserDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { HashManagerMock } from "../../mocks/services/HashManagerMock"
import { LoginSchema } from "../../../src/dtos/user/login.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("deve gerar um token ao efetuar o login", async () => {
        const input = LoginSchema.parse({
            email: "flavia@email.com",
            password: "flavia123"
        })
        const output = await userBusiness.login(input)
        expect(output).toEqual({
            message: "login done",
            token: "token-mock-flavia"
        })
    })

    test("deve dar erro se o email não for encontrado", async () => {
        expect.assertions(3)

        try {
            
            const input = LoginSchema.parse({
                email: "lala@email.com",
                password: "flavia123"
            })
            await userBusiness.login(input)

        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("'EMAIL' not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve dar erro se a senha for incorreta", async () => {
        expect.assertions(3)

        try {
            
            const input = LoginSchema.parse({
                email: "flavia@email.com",
                password: "flavia1230"
            })
            await userBusiness.login(input)

        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Incorrect email or password")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})