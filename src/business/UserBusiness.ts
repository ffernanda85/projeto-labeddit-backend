import { UserDatabase } from "../database/UserDatabase";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
    
    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input
        
        const emailExists = await this.userDatabase.findUserByEmail(email)
        if(emailExists) throw new BadRequestError("'EMAIL' already exists");
        
        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )
        await this.userDatabase.insertUser(newUser.toDBModel())
        const token = this.tokenManager.createToken(newUser.payload())
        const output: SignupOutputDTO = {
            message: "registered user",
            token
        }
        return output
    }
}