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
}