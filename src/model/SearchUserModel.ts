import axios from "axios";

export class SearchUserModel {

    public async getUser(): Promise<Object> {
        try {
   
            const tokenEmailPassword = sessionStorage.getItem("token")
        
            const response = await axios.post("http://localhost:4000/getUser/get-user", {},
                {
                    headers: {
                        Authorization: `Bearer ${tokenEmailPassword}`,
                    }
                })

                const payload = response.data.payload
                const provider = response.data.provider
      
            return {payload, provider}
    
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error("Erro Axios:", error.response?.data || error.message)
            } else {
                console.error("Erro inesperado:", error)
            }
            return {erro: error}
        }
    }

}