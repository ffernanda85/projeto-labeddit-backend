import z from "zod"

export interface DeleteCommentInputDTO {
    id: string,
    token: string
}

export interface DeleteCommentOutputDTO {
    message: string
}

export const DeleteCommentSchema = z.object({
    id: z.string().min(2),
    token: z.string().min(5)
}).transform(data => data as DeleteCommentInputDTO)