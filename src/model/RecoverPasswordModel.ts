import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


export class RecoverPassword {
    private email: string;

    constructor(email: string) {
        this.email = email
    }

    public async recoverpassword(): Promise<boolean> {
        try {

            await sendPasswordResetEmail(auth, this.email);

            return true;

        } catch (error) {

            console.log("Erro ao enviar solicitação de senha" + error)

            return false;
        }
    }
}