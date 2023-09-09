import z from "zod"
import { CommentModelOutput } from "../../models/comments/Comment"

export interface CreateCommentInputDTO {
    post_id: string,
    token: string,
    content: string
}

export interface CreateCommentOutputDTO {
    message: string,
    comment: CommentModelOutput
}

export const CreateCommentSchema = z.object({
    post_id: z.string().min(5),
    token: z.string().min(5),
    content: z.string().min(1)
}).transform(data => data as CreateCommentInputDTO)