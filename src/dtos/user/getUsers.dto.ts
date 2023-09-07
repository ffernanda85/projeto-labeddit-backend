import z from 'zod'
import { UserModel } from '../../models/user/User'

export interface GetUsersInputDTO {
    token: string,
    q?: string
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
    token: z.string().min(5),
    q: z.string().min(1).optional()
}).transform(item => item as GetUsersInputDTO)