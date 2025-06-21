import { CreateUserEmailEPassword } from "./CreateUserEmailEPasswordModel";
import axios from "axios";

export class UserRegisterService {
    private name: string
    private email: string
    private senha: string

    constructor(name: string, email: string, senha: string) {
        this.name = name
        this.email = email
        this.senha = senha
    }

    public async userResgiterService(): Promise<boolean> {
        try {
            const createUser = new CreateUserEmailEPassword(this.email, this.senha)
            const userCreate = await createUser.createUserEmailePassword()
    
            const token = userCreate.token
    
            const response = await axios.post("http://localhost:4000/auth/sign-up", 
                { name: this.name,
                   email: this.email,
                   password: this.senha
                 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
  
                console.log(JSON.stringify(response.data))
                
            return response.data;
    
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error("Erro Axios:", error.response?.data || error.message)
            } else {
                console.error("Erro inesperado:", error)
            }
            return false
        }
    }

}