import {SortDirection} from "mongodb";
import {BlogOutputModel} from "../../features/blogs/types/output/blog-output.type";
import {PostOutputModel} from "../../features/posts/types/output/post-output.type";
import {UserOutputModel} from "../../features/users/types/output/user-output.type";
export type FieldNamesType = keyof BlogOutputModel | keyof PostOutputModel | keyof UserOutputModel
export type validQueryType = {
    pageNumber: number
    pageSize: number
    sortBy: FieldNamesType
    sortDirection: SortDirection
    searchNameTerm: string|null
    searchLoginTerm: string | null
    searchEmailTerm: string | null
}