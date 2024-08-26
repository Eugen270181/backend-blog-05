import {Response, Request} from 'express'
import {usersServices} from "../services/usersServices";
import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserOutputModel} from "../types/output/user-output.type";


//TODO:
export const createUserController = async (req: Request<any, any, CreateUserInputModel>, res: Response<UserOutputModel>) => {
    const newUserId = await usersServices.createUser(req.body)
    const newUser = await usersQueryRepository.findUserAndMap(newUserId)

    if (!newUser) {
        console.log('юзер был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newUser)
};