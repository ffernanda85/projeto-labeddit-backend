import z from "zod"
import { CommentModelOutput } from "../../models/comments/Comment"

export interface EditCommentInputDTO {
    id: string,
    token: string,
    content: string
}

export interface EditCommentOutputDTO {
    message: string
}

export const EditCommentSchema = z.object({
    id: z.string().min(2),
    token: z.string().min(5),
    content: z.string().min(1)
}).transform(data => data as EditCommentInputDTO)