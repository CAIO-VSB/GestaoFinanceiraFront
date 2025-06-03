import { UserRegisterService } from "../model/UserRegisterServiceModel";

export class ControllerCreateUser {
    static async createuser(name:string, email: string, password: string) {
        try {
            const createuser = new UserRegisterService(name, email, password)
            return createuser.userresgiterservice()
        } catch (error) {
            console.log("Erro ao criar novo usuário")
            return { success: false, message: "Erro ao criar novo usuário", error}
        }
    }
}