import {userCollection} from "../../../common/module/db/dbMongo"
import {ObjectId} from "mongodb"
import {UserDbModel} from "../../../common/types/db/user-db.model";

//TODO:
export const usersRepository = {
    async createUser(user: UserDbModel):Promise<string> {
        const result = await userCollection.insertOne(user)
        return result.insertedId.toString() // return _id -objectId
    },
    async findUserById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return userCollection.findOne({ _id: new ObjectId(id) });
    },
    async findUserByLogin(login: string) {
        return !!userCollection.find({login});
    },
    async findUserByEmail(email: string) {
        return !!userCollection.find({email} );
    },
    async deleteUser(id:ObjectId){
        const result = await userCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    }
}