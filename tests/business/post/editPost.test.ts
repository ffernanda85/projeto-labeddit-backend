import { PostBusiness } from "../../../src/business/post/PostBusiness"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { LikeDislikePostDatabaseMock } from "../../mocks/post/LikeDislikePostDatabaseMock"
import { CreatePostSchema } from "../../../src/dtos/post/createPost.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { EditPostSchema } from "../../../src/dtos/post/editPost.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testes editPost", () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new LikeDislikePostDatabaseMock()
    )

    test("deve retornar a mensagem 'updated post'", async () => {
        const input = EditPostSchema.parse({
            id: "post01",
            token: "token-mock-flavia",
            content: "aloha"
        })

        const output = await postBusiness.editPost(input)
        expect(output).toEqual({message: "updated post"})
    })

    test("deve disparar erro e retornar mensagem 'invalid token'", async () => {
        expect.assertions(3)

        try {
            
            const input = EditPostSchema.parse({
                id: "post01",
                token: "token-mock-flaviaa",
                content: "aloha"
            })

            await postBusiness.editPost(input)
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
            
            const input = EditPostSchema.parse({
                id: "post00",
                token: "token-mock-flavia",
                content: "aloha"
            })

            await postBusiness.editPost(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("id not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve disparar erro e retornar mensagem 'You are not creator of the post'", async () => {
        expect.assertions(3)

        try {
            
            const input = EditPostSchema.parse({
                id: "post01",
                token: "token-mock-izabela",
                content: "aloha"
            })
            await postBusiness.editPost(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("You are not creator of the post")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})