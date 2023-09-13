import { UserDatabase } from "../../database/user/UserDatabase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../../dtos/user/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../../dtos/user/signup.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TokenPayload, USER_ROLES, User, UserDBModel, UserModel } from "../../models/user/User";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenManager } from "../../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        const emailExists = await this.userDatabase.findUserByEmail(email)
        if (emailExists) throw new BadRequestError("'EMAIL' already exists");

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

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)
        if (!userDB) throw new NotFoundError("'EMAIL' not found");

        const isMatchPassword = await this.hashManager.compare(password, userDB.password)
        if (!isMatchPassword) throw new BadRequestError("Incorrect email or password");

        const payload: TokenPayload = {
            id: userDB.id,
            name: userDB.name,
            role: userDB.role
        }

        const token = this.tokenManager.createToken(payload)
        const output: LoginOutputDTO = {
            message: "login done",
            token
        }
        return output
    }

    public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
        const { token, q } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)
        if (payload === null) throw new BadRequestError("invalid token");

        if (payload.role !== USER_ROLES.ADMIN) throw new BadRequestError("not authorized");
                
        const usersDB: UserDBModel[] = await this.userDatabase.findUsers(q)

        const users: UserModel[] = usersDB.map(user => {
            const result = new User(
                user.id,
                user.name,
                user.email,
                user.password,
                user.role,
                user.created_at
            )
            return result.toBusinessModel()
        })

        return users
    }
}