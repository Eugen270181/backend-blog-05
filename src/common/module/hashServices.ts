import bcrypt from 'bcrypt'

export const hashServices = {
    async getHash(password:string, saltRounds?:number){
        const saltRound=saltRounds?saltRounds:10
        const hash = await bcrypt.hash(password,saltRound)
        return hash
    },
    async checkHash(password:string, hash:string){
        const isHashValid = await bcrypt.compare(password,hash)
        return isHashValid
    },
}