import { Request, Response } from "express";
import { UserBusiness } from "../../business/UserBusiness";
import { SignupOutputDTO, SignupSchema } from "../../dtos/signup.dto";
import { ZodError } from 'zod'
import { BaseDatabase } from "../../database/BaseDatabase";
import { BaseError } from "../../errors/BaseError";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }
    
    public signup = async (req: Request, res: Response): Promise<void> => {
        try {
        
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const output: SignupOutputDTO = await this.userBusiness.signup(input)

            res.status(201).send(output)
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