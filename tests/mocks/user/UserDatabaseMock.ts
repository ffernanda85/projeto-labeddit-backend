import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { USER_ROLES, UserDBModel } from "../../../src/models/user/User"

export const usersMock: UserDBModel[] = [
    {
        id: "id-mock-flavia",
        name: "Flávia",
        email: "flavia@email.com",
        password: "hash-mock-flavia", //flavia123
        role: USER_ROLES.ADMIN,
        created_at: new Date().toISOString()
    },
    {
        id: "id-mock-izabela",
        name: "Izabela",
        email: "izabela@email.com",
        password: "hash-mock-izabela", //izabela123
        role: USER_ROLES.NORMAL,
        created_at: new Date().toISOString()
    }
]

export class UserDatabaseMock extends BaseDatabase {
    TABLE_NAME = 'users'

    public findUserByEmail = async (email: string): Promise<UserDBModel | undefined> => {
        return usersMock.filter(user => user.email === email)[0]
    }

    public insertUser = async (user: UserDBModel): Promise<void> => { }
    
    public findUsers = async (q: string | undefined): Promise<UserDBModel[]> => {
        
        if (q) {
            return usersMock.filter(user => user.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()))    
        
        } else {
            return usersMock    
        }
    }

}