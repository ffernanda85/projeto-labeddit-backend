import z from 'zod'

export interface DeletePostInputDTO {
    token: string,
    id: string
}

export interface DeletePostOutputDTO {
    message: string
}

export const DeletePostSchema = z.object({
    token: z.string().min(1),
    id: z.string().min(1)
}).transform(data => data as DeletePostInputDTO)