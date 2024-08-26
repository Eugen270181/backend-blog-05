import {Request, Response} from 'express'
import {usersServices} from "../services/usersServices";

//TODO:
export const delUserController = async (req: Request<{id: string}>, res: Response) => {
    const deleteResult = await usersServices.deleteBlog(req.params.id)
    if(!deleteResult) return res.sendStatus(404)
    return  res.sendStatus(204)
}