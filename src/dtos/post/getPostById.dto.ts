import z from 'zod'

export interface GetPostByIdInputDTO {
    id: string,
    token: string
}

export type GetPostByIdOutputDTO = {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export const GetPostByIdSchema = z.object({
    id: z.string().min(2),
    token: z.string().min(5)
}).transform(data => data as GetPostByIdInputDTO)