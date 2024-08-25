import {blogsRepository} from "../repositories/blogsRepository";
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {LoginAuthInputType} from "../types/input/login-auth-input.type";


export const authServices = {
    async isLogin(login:LoginAuthInputType):Promise<string> {
        const {loginOrEmail, password} = login
        const newBlog:BlogDbModel = {
            ...{name, description, websiteUrl},
            createdAt: new Date().toISOString(),
            isMembership:false
        }
        return blogsRepository.createBlog(newBlog)
    }
}