import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";


export class UsuarioGoogle {
    
    public async loginComGoogle(): Promise<boolean> {

        const provider = new GoogleAuthProvider();

        try {

            const result = await signInWithPopup(auth, provider);

            const token = await result.user.getIdToken()

            const response = await axios.post("http://localhost:4000/login/validar-token", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          
            return response.data.autenticado === true;

        } catch (error: any) {

            console.log("Erro na classe usuário" + error.code, error.message);

            return false;
        }

    }
}