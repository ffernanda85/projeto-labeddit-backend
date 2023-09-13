import z from 'zod'

export interface LikeDislikePostInputDTO {
    id: string,
    token: string,
    like: boolean
}

export interface LikeDislikePostOutputDTO {
    message: string
}

export const LikeDislikePostSchema = z.object({
    id: z.string().min(2),
    token: z.string().min(5),
    like: z.boolean()
}).transform(data => data as LikeDislikePostInputDTO)