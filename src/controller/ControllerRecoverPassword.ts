import { RecoverPassword } from "../model/RecoverPasswordModel";

export class ControllerRecoverPassword {
    
    static async recoverpassword(email: string): Promise<boolean> {

        try {
            const recover = new RecoverPassword(email)
            return await recover.recoverpassword();
        } catch (error) {
            console.log("Erro no controller recoverpassword" + error)
            return false;
        }
    }
}