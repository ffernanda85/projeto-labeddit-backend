import { Request, Response } from "express";
import { CommentBusiness } from "../../business/comment/CommentBusiness";
import { ZodError } from "zod";
import { BaseError } from "../../errors/BaseError";
import { CreateCommentSchema } from "../../dtos/comment/createComment.dto";
import { EditCommentOutputDTO, EditCommentSchema } from "../../dtos/comment/editComment.dto";

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
}