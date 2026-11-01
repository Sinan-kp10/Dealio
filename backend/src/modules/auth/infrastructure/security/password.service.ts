import bcrypt from "bcrypt";

export class PasswordService {
    private readonly saltRound = 12
    
    hash = async (password : string) : Promise<string> => {
        return bcrypt.hash(password, this.saltRound)
    }

    verify = async ( password: string, hashedPassword : string) : Promise<boolean> => {
        return bcrypt.compare(password, hashedPassword)
    }
}