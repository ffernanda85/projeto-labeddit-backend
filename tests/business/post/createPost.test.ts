import { PostBusiness } from "../../../src/business/post/PostBusiness"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { LikeDislikePostDatabaseMock } from "../../mocks/post/LikeDislikePostDatabaseMock"
import { CreatePostSchema } from "../../../src/dtos/post/createPost.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Testes createPost", () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new LikeDislikePostDatabaseMock()
    )

    test("deve retornar a mensagem 'post created'", async () => {
        const input = CreatePostSchema.parse({
            token: "token-mock-flavia",
            content: "aloha"
        })

        const output = await postBusiness.createPost(input)
        expect(output).toEqual({message: "post created"})
    })

    test("deve disparar erro e retornar mensagem 'invalid token'", async () => {
        expect.assertions(3)

        try {
            
            const input = CreatePostSchema.parse({
                token: "token",
                content: "aloha"
            })

            await postBusiness.createPost(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})