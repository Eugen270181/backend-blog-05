import {usersRepository} from "../repositories/usersRepository";
import {ObjectId} from "bson";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserDbModel} from "../../../common/types/db/user-db.model";
import {OutputErrorsType} from "../../../common/types/output-errors-type";
import {getHashes} from "crypto";
import {hashServices} from "../../../common/module/hashServices";
import {FieldNamesType} from "../../../common/types/valid-query-type";

enum StatusCode {
    NoSuccess=false,
    Success=true
}

type Result<T> = {
    data:T|null,
    statusCode:StatusCode
}
const createResult = <T>(data: T | null, statusCode: StatusCode): Result<T> => {
    return { data, statusCode };
};
const ErrorObject = ( message: string, field: FieldNamesType ):OutputErrorsType => {
    return { errorsMessages: [ {message, field} ] }
}

export const usersServices = {
    async createUser(user: CreateUserInputModel):Promise<Result<string|OutputErrorsType>> {
        const {login, password, email} = user
        if (await usersRepository.findUserByLogin(login)) return createResult(ErrorObject('Not unique login!','login'),StatusCode.NoSuccess)
        if (await usersRepository.findUserByLogin(email)) return createResult(ErrorObject('Not unique email!','email'),StatusCode.NoSuccess)
        const newUser:UserDbModel = {
            ...{login,email},
            passHash: await hashServices.getHash(password),
            createdAt: new Date().toISOString()
        }
        const newUserId = await usersRepository.createUser(newUser)
        return createResult(newUserId,StatusCode.Success)
    },
    async deleteUser(id:string){
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return usersRepository.deleteUser(new ObjectId(id))
    }
}