import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios"

export class Usuario {

    private email: string;
    private senha: string;

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha;
    } 

    public async LoginComEmailESenha(): Promise<boolean> {

        try {
            
           const userCredential =  await signInWithEmailAndPassword(auth, this.email, this.senha);
           
           const token =  await userCredential.user.getIdToken()

           const response = await axios.post("http://localhost:4000/auth/sign-in", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })


           sessionStorage.setItem("token", token)
           
            return response.data;

        } catch (error: any) {

          if (axios.isAxiosError(error) && error.response) {
            console.log("O retorno foi esse aqui " + JSON.stringify(error.response.data))
          }
            return false;
        }
        
    }
}
