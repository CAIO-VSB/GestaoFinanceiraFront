import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export class CreateUserEmailEPassword {

    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    public async createuseremailepassword(): Promise<{email: string, token: string}> {
        try {
           
            const dataUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
            const token = await dataUser.user.getIdToken()

            return {email: dataUser.user.email ?? "nulo", token: token}
            
        } catch (error) {
            console.log("Erro ao criar novo usuário")
            return {email: "nulo", token: "nulo"}
        }
    }
}