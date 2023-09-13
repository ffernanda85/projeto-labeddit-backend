import { UserBusiness } from "../../../src/business/user/UserBusiness"
import { UserDatabaseMock } from "../../mocks/user/UserDatabaseMock"
import { IdGeneratorMock } from "../../mocks/services/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/services/TokenManagerMock"
import { HashManagerMock } from "../../mocks/services/HashManagerMock"
import { SignupSchema } from "../../../src/dtos/user/signup.dto"
import { BaseError } from "../../../src/errors/BaseError"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Testando login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    
})