import { PostBusiness } from "../../../src/business/post/PostBusiness"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/post/PostDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { LikeDislikePostDatabaseMock } from "../../mocks/post/LikeDislikePostDatabaseMock"
import { LikeDislikePostSchema } from "../../../src/dtos/post/likeDislikePost.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testes likeDislikePost", () => {
    const postBusiness = new PostBusiness(
        new TokenManagerMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new LikeDislikePostDatabaseMock()
    )

    test("testando like e dislike existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post01",
            token: "token-mock-flavia",
            like: true
        })
        //testando like
        let output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post01",
            token: "token-mock-flavia",
            like: false
        })
        //testando dislike
        let output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
        //testando like
        input.like = true
        output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post02",
            token: "token-mock-izabela",
            like: false
        })
        //testando dislike
        let output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
        //testando like
        input.like = true
        output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike NÃO existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post01",
            token: "token-mock-izabela",
            like: true
        })
        //testando like
        let output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike NÃO existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post01",
            token: "token-mock-izabela",
            like: false
        })
        //testando dislike
        let output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
        //testando like
        input.like = true
        output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
    })

    test("testando like e dislike NÃO existente, deve retornar a mensagem 'success'", async () => {
        const input = LikeDislikePostSchema.parse({
            id: "post02",
            token: "token-mock-flavia",
            like: true
        })
        //testando like
        let output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
        //testando dislike
        input.like = false
        output = await postBusiness.likeDislike(input)
        expect(output).toBe("success")
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
})