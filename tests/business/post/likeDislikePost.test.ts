import { PostBusiness } from "../../../src/business/post/PostBusiness"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { LikeDislikePostDatabaseMock } from "../../mocks/post/LikeDislikePostDatabaseMock"
import { LikeDislikePostSchema } from "../../../src/dtos/post/likeDislikePost.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testes deletePost", () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new LikeDislikePostDatabaseMock()
    )

    test("deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post02",
            token: "token-mock-flavia",
            like: true
        })
        const output = await postBusiness.likeDislike(input)
        expect(output).toEqual({ message: "success" })
    })

    test("deve disparar erro e retornar mensagem 'invalid token'", async () => {
        expect.assertions(3)

        try {
            
            const input = LikeDislikePostSchema.parse({
                id: "post01",
                token: "token-mock-flaviaa",
                like: true
            })
            await postBusiness.likeDislike(input)
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
            const input = LikeDislikePostSchema.parse({
                id: "post010",
                token: "token-mock-flavia",
                like: true
            })
            await postBusiness.likeDislike(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("id not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("deve disparar erro e retornar mensagem 'creator can't like or dislike the post'", async () => {
        expect.assertions(3)

        try {
            const input = LikeDislikePostSchema.parse({
                id: "post01",
                token: "token-mock-flavia",
                like: true
            })
            await postBusiness.likeDislike(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("creator can't like or dislike the post")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    
})