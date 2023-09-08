import { UserDBModel } from "../../models/user/User";
import { BaseDatabase } from "../BaseDatabase";

export class UserDatabase extends BaseDatabase{
    TABLE_NAME = 'users'

    public findUserByEmail = async (email: string): Promise<UserDBModel | undefined> => {
        const [userDB]: UserDBModel[] | undefined = await BaseDatabase.connection(this.TABLE_NAME).where({ email })
        
        return userDB
    }

    public insertUser = async (user: UserDBModel): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert(user)
    }

    public findUsers = async (q: string | undefined): Promise<UserDBModel[]> => {
        let usersDB

        if (q) {
            const result: UserDBModel[] = await BaseDatabase.connection(this.TABLE_NAME).where("name", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: UserDBModel[] = await BaseDatabase.connection(this.TABLE_NAME)
            usersDB = result
        }
        return usersDB
    }
}