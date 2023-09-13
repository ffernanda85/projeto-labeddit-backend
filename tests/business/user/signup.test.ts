import { UserBusiness } from "../../../src/business/user/UserBusiness"
import { UserDatabaseMock } from "../../mocks/user/UserDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { HashManagerMock } from "../../mocks/services/HashManagerMock"
import { SignupSchema } from "../../../src/dtos/user/signup.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Testando signup", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("deve gerar token ao se cadastrar", async () => {
        const input = SignupSchema.parse({
            name: 'aloha',
            email: 'aloha@email.com',
            password: 'aloha123'
        })
        const output = await userBusiness.signup(input)

        expect(output).toEqual({
            message: "registered user",
            token: "token-mock"
        })
    })

    test("deve disparar erro se email já estiver cadastrado", async () => {
        expect.assertions(3)
        
        try {
            const input = SignupSchema.parse({
                name: 'aloha',
                email: 'flavia@email.com',
                password: 'aloha123'
            })
            
            await userBusiness.signup(input)

        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'EMAIL' already exists")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})