import {LoginInputModel} from "../types/input/login-input.model";


export const authServices = {
    async isLogin(login:LoginInputModel):Promise<boolean> {
        const {loginOrEmail, password} = login
        //проверка через функцию хеш-паролей
        return true
    }
}