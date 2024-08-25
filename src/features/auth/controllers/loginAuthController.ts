import {Response, Request} from 'express'


export const loginAuthController = async (req: Request<any, any, CreateBlogInputModel>, res: Response<BlogOutputModel>) => {
    const newBlogId = await blogsServices.createBlog(req.body)
    const newBlog = await blogsQueryRepository.findBlogAndMap(newBlogId)

    if (!newBlog) {
        console.log('блог был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newBlog)
}