import {usersRepository} from "../repositories/usersRepository";
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";
import {BlogDbModel} from "../../../common/types/db/blog-db.model";
import {ObjectId} from "bson";

//TODO:
export const usersServices = {
    async createBlog(blog: CreateBlogInputModel):Promise<string> {
        const {name, description, websiteUrl} = blog
        const newBlog:BlogDbModel = {
            ...{name, description, websiteUrl},
            createdAt: new Date().toISOString(),
            isMembership:false
        }
        return usersRepository.createBlog(newBlog)
    },
    async deleteBlog(id:string){
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return false
        return usersRepository.deleteBlog(new ObjectId(id))
    },
    async updateBlog(blog: UpdateBlogInputModel, id: string) {
        return usersRepository.updateBlog(blog,id)
    },
}