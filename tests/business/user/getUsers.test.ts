import { UserBusiness } from "../../../src/business/user/UserBusiness"
import { UserDatabaseMock } from "../../mocks/user/UserDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { HashManagerMock } from "../../mocks/services/HashManagerMock"
import { GetUsersSchema } from "../../../src/dtos/user/getUsers.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { USER_ROLES } from "../../../src/models/user/User"

describe("Testando getUsers", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("Deve retornar o array de Users com length de 2", async () => {
        const input = GetUsersSchema.parse({
            token: "token-mock-flavia"
        })
        const output = await userBusiness.getUsers(input)
        expect(output).toHaveLength(2)
    })

    test("Deve retornar o array com 01 usuário", async () => {
        const input = GetUsersSchema.parse({
            token: "token-mock-flavia",
            q: "f"
        })
        const output = await userBusiness.getUsers(input)
        expect(output).toHaveLength(1)
        expect(output).toEqual([{
            id: "id-mock-flavia",
            name: "Flávia",
            role: USER_ROLES.ADMIN,
            createdAt: expect.any(String)
        }])
    })

    test("Deve retornar a mensagem 'invalid token'", async () => {
        expect.assertions(3)
        
        try {
    
            const input = GetUsersSchema.parse({
                token: "token"
            })
            await userBusiness.getUsers(input)
        
        } catch (error) {
            
            expect(error).toBeInstanceOf(BaseError)
            
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Deve retornar a mensagem 'not authorized'", async () => {
        expect.assertions(3)
        
        try {
    
            const input = GetUsersSchema.parse({
                token: "token-mock-izabela"
            })
            await userBusiness.getUsers(input)
        
        } catch (error) {
            
            expect(error).toBeInstanceOf(BaseError)
            
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("not authorized")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})