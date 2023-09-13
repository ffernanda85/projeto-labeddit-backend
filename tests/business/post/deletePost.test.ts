import { PostBusiness } from "../../../src/business/post/PostBusiness"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { LikeDislikePostDatabaseMock } from "../../mocks/post/LikeDislikePostDatabaseMock"
import { DeletePostSchema } from "../../../src/dtos/post/deletePost.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { EditPostSchema } from "../../../src/dtos/post/editPost.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testes deletePost", () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new LikeDislikePostDatabaseMock()
    )

    test("deve retornar a mensagem 'post deleted'", async () => {
        const input = DeletePostSchema.parse({
            id: "post01",
            token: "token-mock-flavia"
        })
        const output = await postBusiness.deletePost(input)
        expect(output).toEqual({message: "post deleted"})
    })

    test("deve disparar erro e retornar mensagem 'invalid token'", async () => {
        expect.assertions(3)

        try {
            
            const input = DeletePostSchema.parse({
                id: "post01",
                token: "token-mock-flaviaa"
            })
            await postBusiness.deletePost(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro e retornar mensagem 'id not found'", async () => {
        expect.assertions(3)

        try {
            
            const input = DeletePostSchema.parse({
                id: "post00",
                token: "token-mock-flavia"
            })
            await postBusiness.deletePost(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("id not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve disparar erro e retornar mensagem 'Not Authorized!'", async () => {
        expect.assertions(3)

        try {
            const input = DeletePostSchema.parse({
                id: "post01",
                token: "token-mock-izabela"
            })
            await postBusiness.deletePost(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Not Authorized!")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})