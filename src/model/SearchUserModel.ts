import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";

export class SearchUserModel {

    private email: string
    private senha: string
    
    constructor(email: string, senha: string) {
        this.email = email
        this.senha = senha
    }

    public async searchUserModel(): Promise<boolean> {
        try {
            const createuser = signInWithEmailAndPassword(auth, this.email, this.senha)
            
            const token = (await createuser).user.getIdToken()
    
            const response = await axios.post("http://localhost:4000/buscar-user", {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
    
            return response.data.autenticado === true;
    
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