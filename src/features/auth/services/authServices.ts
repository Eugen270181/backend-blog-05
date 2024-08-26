import {LoginInputModel} from "../types/input/login-input.model";


export const authServices = {
    async isLogin(login:LoginInputModel):Promise<boolean> {
        const {loginOrEmail, password} = login
        //TODO:проверка через функцию хеш-паролей. сама функция дб вынесена в утилиты общие например
        return true
    }
}