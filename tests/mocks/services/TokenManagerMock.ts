import { TokenPayload, USER_ROLES } from "../../../src/models/user/User"

export class TokenManagerMock {
    public createToken = (payload: TokenPayload): string => {
        
        if (payload.id === "id-mock") {
            return "token-mock"
        
        } else if (payload.id === "id-mock-flavia") {
            return "token-mock-flavia"
        
        } else {
            return "token-mock-izabela"    
        }
    }

    public getPayload = (token: string): TokenPayload | null => {
        
        if (token === "token-mock-flavia") {
            return {
                id: "id-mock-flavia",
                name: "flavia",
                role: USER_ROLES.ADMIN
            }
        
        } else if (token === "token-mock-izabela") {
            return {
                id: "id-mock-izabela",
                name: "izabela",
                role: USER_ROLES.NORMAL
            }
        
        } else {
            return null
        }
    }
}