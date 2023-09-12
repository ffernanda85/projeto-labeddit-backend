import { Request, Response } from "express";
import { CommentBusiness } from "../../business/comment/CommentBusiness";
import { ZodError } from "zod";
import { BaseError } from "../../errors/BaseError";
import { CreateCommentSchema } from "../../dtos/comment/createComment.dto";
import { EditCommentOutputDTO, EditCommentSchema } from "../../dtos/comment/editComment.dto";
import { DeleteCommentOutputDTO, DeleteCommentSchema } from "../../dtos/comment/deleteComment.dto";
import { GetCommentsOutputDTO, GetCommentsSchema } from "../../dtos/comment/getComments.dto";
import { LikeDislikeCommentSchema } from "../../dtos/comment/likeDislikeComment.dto";



export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }
    
    public createComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = CreateCommentSchema.parse({
                post_id: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            })

            const output = await this.commentBusiness.createComment(input)

            res.status(201).send(output)
        } catch (error : unknown) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error")
            }
        }
    }

    public editComment = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const input = EditCommentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            })
            const output: EditCommentOutputDTO = await this.commentBusiness.editComment(input)
            res.status(200).send(output)
        } catch (error: unknown) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error")
            }
        }
    }

    public deleteComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeleteCommentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })
            const output: DeleteCommentOutputDTO = await this.commentBusiness.deleteComment(input)
            res.status(200).send(output)            
        } catch (error: unknown) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error")
            }
        }
    }

    public getComments = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = GetCommentsSchema.parse({
                postId: req.params.id,
                token: req.headers.authorization
            })
            const output: GetCommentsOutputDTO = await this.commentBusiness.getComments(input)
            res.status(200).send(output)
        } catch (error: unknown) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error")
            }
        }
    }

    public likeDislikeComment = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const input = LikeDislikeCommentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            })
            await this.commentBusiness.likeDislikeComment(input)
            res.status(200).send()
        } catch (error: unknown) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error")
            }
        }
    }
}