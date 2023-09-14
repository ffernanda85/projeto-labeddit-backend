import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { CommentBusiness } from "../../../src/business/comment/CommentBusiness"
import { CommentDatabaseMock } from "../../mocks/comment/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/comment/LikeDislikeCommentDatabaseMock"
import { CreateCommentSchema } from "../../../src/dtos/comment/createComment.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando createComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new LikeDislikeCommentDatabaseMock()
    )

    test("retorna a mensagem 'comment created'", async () => {
        const input = CreateCommentSchema.parse({
            post_id: "post02",
            token: "token-mock-flavia",
            content: "Já deu certo"
        })
        const output = await commentBusiness.createComment(input)
        expect(output).toEqual({ message: 'comment created' })
    })

    test("retorna a mensagem 'invalid token'", async () => {
        expect.assertions(3)
        
        try {
            const input = CreateCommentSchema.parse({
                post_id: "post02",
                token: "token-mock-flaviaa",
                content: "Já deu certo"
            })
            await commentBusiness.createComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retorna a mensagem 'post not found'", async () => {
        expect.assertions(3)
        
        try {
            const input = CreateCommentSchema.parse({
                post_id: "post023",
                token: "token-mock-flavia",
                content: "Já deu certo"
            })
            await commentBusiness.createComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("post not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })
})