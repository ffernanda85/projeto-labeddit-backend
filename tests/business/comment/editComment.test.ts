import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { CommentBusiness } from "../../../src/business/comment/CommentBusiness"
import { CommentDatabaseMock } from "../../mocks/comment/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/comment/LikeDislikeCommentDatabaseMock"
import { EditCommentSchema } from "../../../src/dtos/comment/editComment.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando editComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new LikeDislikeCommentDatabaseMock()
    )

    test("retorna a mensagem 'updated comment'", async () => {
        const input = EditCommentSchema.parse({
            id: "c001",
            token: "token-mock-flavia",
            content: "Já deu certo"
        })
        const output = await commentBusiness.editComment(input)
        expect(output).toEqual({ message: 'updated comment' })
    })

    test("retorna a mensagem 'invalid token'", async () => {
        expect.assertions(3)
        
        try {
            const input = EditCommentSchema.parse({
                id: "c001",
                token: "token-mock-flaviaa",
                content: "Já deu certo"
            })
            await commentBusiness.editComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retorna a mensagem 'Id Comment not found'", async () => {
        expect.assertions(3)
        
        try {
            const input = EditCommentSchema.parse({
                id: "post023",
                token: "token-mock-flavia",
                content: "Já deu certo"
            })
            await commentBusiness.editComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Id Comment not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("retorna a mensagem 'only the creator can edit the comment'", async () => {
        expect.assertions(3)
        
        try {
            const input = EditCommentSchema.parse({
                id: "c002",
                token: "token-mock-izabela",
                content: "Já deu certo"
            })
            await commentBusiness.editComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("only the creator can edit the comment")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})