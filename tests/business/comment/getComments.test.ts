import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { CommentBusiness } from "../../../src/business/comment/CommentBusiness"
import { CommentDatabaseMock } from "../../mocks/comment/CommentDatabaseMock"
import { LikeDislikeCommentDatabaseMock } from "../../mocks/comment/LikeDislikeCommentDatabaseMock"
import { GetCommentsSchema } from "../../../src/dtos/comment/getComments.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando getComments", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new LikeDislikeCommentDatabaseMock()
    )

    test("retorna 01 array de CommentModelOutput", async () => {
        const input = GetCommentsSchema.parse({
            postId: "post02",
            token: "token-mock-flavia"
        })
        const output = await commentBusiness.getComments(input)
        expect(output).toContainEqual({
            id: "c002",
            postId: "post02",
            content: "string",
            likes: 0,
            dislikes: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            creator: {
                id: "id-mock-flavia",
                name: "Flávia"
            }
        })
        expect(output).toHaveLength(1)
        expect(output).toEqual([{
            id: "c002",
            postId: "post02",
            content: "string",
            likes: 0,
            dislikes: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            creator: {
                id: "id-mock-flavia",
                name: "Flávia"
            }
        }])
    })

    test("retorna um array de CommentModelOutput", async () => {
        const input = GetCommentsSchema.parse({
            postId: "post01",
            token: "token-mock-flavia"
        })
        const output = await commentBusiness.getComments(input)
        expect(output).toContainEqual({
            id: "c003",
            postId: "post01",
            content: "string",
            likes: 0,
            dislikes: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            creator: {
                id: "id-mock-izabela",
                name: "Izabela"
            }
        })
        expect(output).toHaveLength(2)
    })

    test("retorna a mensagem 'invalid token'", async () => {
        expect.assertions(3)

        try {
            const input = GetCommentsSchema.parse({
                postId: "post01",
                token: "token-mock-flaviaa"
            })
            await commentBusiness.getComments(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("invalid token")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retorna a mensagem 'postId not found'", async () => {
        expect.assertions(3)

        try {
            const input = GetCommentsSchema.parse({
                postId: "c001a",
                token: "token-mock-flavia"
            })
            await commentBusiness.getComments(input)

        } catch (error) {
            console.log(error)
            expect(error).toBeInstanceOf(BaseError)
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("postId not found")
                expect(error.statusCode).toBe(404)
            }
        }
    })
})