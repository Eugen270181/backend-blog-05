import {Response, Request} from 'express'
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {BlogOutputModel} from "../types/output/blog-output.type";
import {usersServices} from "../services/usersServices";
import {usersQueryRepository} from "../repositories/usersQueryRepository";


//TODO:
export const createUserController = async (req: Request<any, any, CreateBlogInputModel>, res: Response<BlogOutputModel>) => {
    const newBlogId = await usersServices.createBlog(req.body)
    const newBlog = await usersQueryRepository.findBlogAndMap(newBlogId)

    if (!newBlog) {
        console.log('блог был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newBlog)
}