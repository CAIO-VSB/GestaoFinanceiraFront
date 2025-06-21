import { Usuario } from "../model/UserModel";
import { UsuarioGoogle } from "../model/UserModelGoogle";


export class ControllerLogin {

    static async signEmailESenha(email: string, senha: string): Promise<boolean> {

        try {
            const usuario = new Usuario(email, senha);
            return await usuario.LoginComEmailESenha();
        } catch (error) {
            console.log("Erro no controllerUserNormal" + error)
            return false;
        }
    }

    static async signGoolge(): Promise<boolean> {

        try {
            const usuariogoolge = new UsuarioGoogle();
            return await usuariogoolge.loginComGoogle();
        }catch (error) {
            console.log("Erro no controller:" + error)
            return false;
        }
    }

}

