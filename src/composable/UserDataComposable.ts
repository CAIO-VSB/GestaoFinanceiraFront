import axios from "axios";
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


const userData = ref(null)
const Loading = ref(false)

export function useSearchUser() {

    async function SearchUser(email: string, senha:string) {

        Loading.value = true

        try {
    
            const dataUser = await signInWithEmailAndPassword(auth, email, senha)

            const token = await dataUser.user.getIdToken()
    
            const response = await axios.post("http://localhost:4000/buscar-user", {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
    
            userData.value = response.data
    
            console.log("O usuário no momento" + JSON.stringify(response.data))
    
        } catch (error) {
    
            console.log("Erro ao buscar o usuário no back " + error)

        } finally {

            Loading.value = false
        }
    }

    
    return {
        userData,
        Loading,
        SearchUser
    }
}

