import z from "zod"
import { CommentModelOutput } from "../../models/comments/Comment"

export interface GetCommentsInputDTO {
    postId: string,
    token: string
}

export type GetCommentsOutputDTO = CommentModelOutput[]

export const GetCommentsSchema = z.object({
    postId: z.string().min(2),
    token: z.string().min(5)
}).transform(data => data as GetCommentsInputDTO)