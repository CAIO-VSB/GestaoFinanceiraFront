import axios from "axios";

export class SearchUserModelGoolge {

    public async getUser(): Promise<Object> {
        try {
   
            const tokenGoogle = sessionStorage.getItem("Token google")
    
            const response = await axios.post("http://localhost:4000/getUser/get-user-google", {},
                {
                    headers: {
                        Authorization: `Bearer ${tokenGoogle}`,
                    }
                })

                const payloadGoogle = response.data.userName
                const provedorGoogle = response.data.provider
            
            return {payloadGoogle, provedorGoogle}
    
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error("Erro Axios:", error.response?.data || error.message)
            } else {
                console.error("Erro inesperado:", error)
            }

            return {error: error}
        }
    }

}