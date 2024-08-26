import {usersRepository} from "../repositories/usersRepository";
import {ObjectId} from "bson";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserDbModel} from "../../../common/types/db/user-db.model";

//TODO:
export const usersServices = {
    async createUser(user: CreateUserInputModel):Promise<string> {
        const {login, password, email} = user
        //TODO:проверка уникальности логина и емэйла
        const newUser:UserDbModel = {
            ...{login,email},
            //TODO: подключить ф-ию сервиса bcrypt
            passHash:'passHash(password)',
            createdAt: new Date().toISOString()
        }
        return usersRepository.createUser(newUser)
    },
    async deleteUser(id:string){
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return usersRepository.deleteUser(new ObjectId(id))
    }
}