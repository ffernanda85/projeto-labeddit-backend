import { Request, Response } from "express";
import { UserBusiness } from "../../business/user/UserBusiness";
import { SignupOutputDTO, SignupSchema } from "../../dtos/user/signup.dto";
import { ZodError } from 'zod'
import { BaseError } from "../../errors/BaseError";
import { LoginOutputDTO, LoginSchema } from "../../dtos/user/login.dto";
import { GetUsersOutputDTO, GetUsersSchema } from "../../dtos/user/getUsers.dto";

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

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })
            const output: LoginOutputDTO = await this.userBusiness.login(input)
            res.status(200).send(output)
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

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {

            const input = GetUsersSchema.parse({
                token: req.headers.authorization,
                q: req.query.q
            })
            const output: GetUsersOutputDTO = await this.userBusiness.getUsers(input)
            res.status(200).send(output)            
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