import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { CommentBusiness } from "../../../src/business/comment/CommentBusiness"
import { CommentDatabaseMock } from "../../mocks/comment/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/comment/LikeDislikeCommentDatabaseMock"
import { LikeDislikeCommentSchema } from "../../../src/dtos/comment/likeDislikeComment.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando likeDislikeComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new LikeDislikeCommentDatabaseMock()
    )

    test("testando like e dislike existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikeCommentSchema.parse({
            id: "c001",
            token: "token-mock-flavia",
            like: true
        })
        //testando like
        let output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikeCommentSchema.parse({
            id: "c001",
            token: "token-mock-flavia",
            like: false
        })
        //testando dislike
        let output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
        //testando like
        input.like = true
        output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikeCommentSchema.parse({
            id: "c002",
            token: "token-mock-izabela",
            like: true
        })
        //testando like
        let output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike não existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikeCommentSchema.parse({
            id: "c001",
            token: "token-mock-izabela",
            like: true
        })
        //testando like
        let output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike não existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikeCommentSchema.parse({
            id: "c001",
            token: "token-mock-izabela",
            like: false
        })
        //testando dislike
        let output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
        //testando like
        input.like = true
        output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike não existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikeCommentSchema.parse({
            id: "c002",
            token: "token-mock-flavia",
            like: true
        })
        //testando like
        let output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await commentBusiness.likeDislikeComment(input)
        expect(output).toBe("success")
    })
   
    test("deve disparar erro e retornar mensagem 'invalid token'", async () => {
        expect.assertions(3)

        try {
            const input = LikeDislikeCommentSchema.parse({
                id: "c001",
                token: "token-mock-flaviaa",
                like: true
            })
            await commentBusiness.likeDislikeComment(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro e retornar mensagem 'Comment Id not found'", async () => {
        expect.assertions(3)

        try {
            const input = LikeDislikeCommentSchema.parse({
                id: "post010",
                token: "token-mock-flavia",
                like: true
            })
            await commentBusiness.likeDislikeComment(input)
        } catch (error) {
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Comment Id not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })
})