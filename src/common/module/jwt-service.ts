import {UserDbModel} from "../types/db/user-db.model";
import  {jwt} from 'jsonwebtoken'
import {SETTINGS} from "../../settings";
import {WithId} from "mongodb"


export const jwtService = {
    async createJWT(user:WithId<UserDbModel>):Promise<string> {
        const token = await  jwt.sign({userId:user._id.toString()},SETTINGS.SECRET_KEY,{expiresIn:'1h'})
        return token
    },
    async getUserByIdToken(token:string){
        try {
            const result = await jwt.verify(token, SETTINGS.SECRET_KEY)
            return result.userId.toString()
        }
        catch (e) {
            return null
        }

    }
}