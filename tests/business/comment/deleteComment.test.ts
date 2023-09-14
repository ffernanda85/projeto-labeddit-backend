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
import { DeleteCommentSchema } from "../../../src/dtos/comment/deleteComment.dto"

describe("Testando deleteComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new LikeDislikeCommentDatabaseMock()
    )

    test("criador do comentário, retorna a mensagem 'comment deleted'", async () => {
        const input = DeleteCommentSchema.parse({
            id: "c001",
            token: "token-mock-flavia"
        })
        const output = await commentBusiness.deleteComment(input)
        expect(output).toEqual({ message: 'comment deleted' })
    })

    test("usuário ADMIN, retorna a mensagem 'comment deleted'", async () => {
        const input = DeleteCommentSchema.parse({
            id: "c003",
            token: "token-mock-flavia"
        })
        const output = await commentBusiness.deleteComment(input)
        expect(output).toEqual({ message: 'comment deleted' })
    })

    test("retorna a mensagem 'invalid token'", async () => {
        expect.assertions(3)
        
        try {
            const input = DeleteCommentSchema.parse({
                id: "c001",
                token: "token-mock-flaviaa"
            })
            await commentBusiness.deleteComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retorna a mensagem 'Id comment not found'", async () => {
        expect.assertions(3)
        
        try {
            const input = DeleteCommentSchema.parse({
                id: "c001a",
                token: "token-mock-flavia"
            })
            await commentBusiness.deleteComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Id comment not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    test("retorna a mensagem 'you aren't authorized for this action'", async () => {
        expect.assertions(3)
        
        try {
            const input = DeleteCommentSchema.parse({
                id: "c001",
                token: "token-mock-izabela"
            })
            await commentBusiness.deleteComment(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("you aren't authorized for this action")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})