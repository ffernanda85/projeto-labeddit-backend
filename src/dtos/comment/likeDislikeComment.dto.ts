import z from 'zod'

export interface LikeDislikeCommentInputDTO {
    id: string,
    token: string,
    like: boolean
}

export const LikeDislikeCommentSchema = z.object({
    id: z.string().min(2),
    token: z.string().min(5),
    like: z.boolean()
}).transform(data => data as LikeDislikeCommentInputDTO)