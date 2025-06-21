import { ref, onMounted } from "vue";
import { SearchUserModel } from "../model/SearchUserModel";
import { SearchUserModelGoolge } from "../model/SearchUserModelGoogle";


export function useSearchUser() {

    const userDataCurrent = ref("")
    const loading = ref(false)
    const typeLogin = ref("")

    const searchUserModel = new SearchUserModel()
    const googleUserService = new SearchUserModelGoolge()

    const validEmail = sessionStorage.getItem("type password")
    const validGoogle = sessionStorage.getItem("type google")

    async function getUser() {

        loading.value = true

        try {

            const userDataEmail = await searchUserModel.getUser()

            const userDataGoogle = await googleUserService.getUser()
            
            const providerEmail = userDataEmail.provider

            const providerGoogle = userDataGoogle.provedorGoogle


            if (validGoogle) {
               return userDataCurrent.value = userDataGoogle.payloadGoogle
            }

            if (validEmail) {
                return userDataCurrent.value = userDataEmail.payload.name
            }
            
            console.log("google " + providerGoogle)
            console.log("email " + providerEmail)
            
        } catch (error) {
            console.log("Erro ao buscar o usuário no back " + error)
        } finally {
            loading.value = false
        }
    }

    onMounted(() => { // Sempre que o obejto é momento eu chamo está função  
        getUser()
    })
    

    return {
        userDataCurrent,
        typeLogin,
        loading,
        getUser

    }

}

