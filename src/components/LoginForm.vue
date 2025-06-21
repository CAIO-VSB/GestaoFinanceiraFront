<template>

    <main class="login__main">
        
        <div class="login__container">

            <form @submit.prevent="LoginEmailSenha">

            <div class="login__logo-container">
                <img src="/src//assets/financial-profit.png" alt="logo">
                <h2 class="login__logo-title">Minhas Finanças</h2>
            </div>
      
            <hr style="color: gray; margin: 10px;">

            <div class="login__welcome">
                <h3 class="login__subtitle">Bem-vindo de volta!</h3>
                <p class="login__description">Acesse sua conta para continuar</p>
            </div>

            <div class="login__form-group"> 
            <!--div que controla os forms itens-->

            <div class="login__form-item">
     
            <q-input v-model="inputEmail" outlined type="email" prefix="E-mail:"
                autocomplete="email"
                name="email"
                title="Insira um e-mail válido"
                :rules="[validEmailRule]"
                clearable
                lazy-rules
                ref="emailField"
                @keyup.enter="loginEnter">
                <template v-slot:prepend>
                <q-icon name="mail" />
                </template>
            </q-input>

            </div>

            <div class="login__form-item">
            <q-input :type="isPwd ? 'password' : 'text' " v-model="inputPassword" outlined    prefix="Senha:"
                title="Insira um e-mail válido"
                :rules="[validPasswordRule]"
                clearable
                lazy-rules
                ref="passwordField"
                @keyup.enter="loginEnter">
                <template v-slot:prepend>
                <q-icon name="password" />
                </template>
                
                 <template v-slot:append>
                    <q-icon style="cursor: pointer;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
   
            </div>

            <div class="login__form-button">
                <q-btn 
                style="padding: 10px; width: 100%;" color="primary" label="Entrar"
                type="submit"
                :loading="loading"
                >

                <template #loading>
                    <q-spinner-hourglass
                    color="white"
                    size="1.5em"
                    />
                </template>
                
                </q-btn>
            </div>

            <div class="login__extras">
                <router-link style="text-decoration: none;" to="Recuperar-Senha">Esqueceu sua senha?</router-link>

            </div>

            <div class="login__extras--title-outras-formas">
                <span>Outras formas de login</span>
            </div>

            <div class="login__extras--goolge">
                <button @keyup.enter="loginEnter" @click="loginGoogle" type="button" class="login__bnt--google">
                    <img class="login__img--goolge" src="/src/assets/google-icon.svg">
                    <span>Google</span>
                </button>
            </div>
            <div class="login__extras--criar-conta">
              <router-link style="text-decoration: none;" to="Novo-Usuario">Não possui conta? Cadastre-se</router-link>
            </div>
        </div>

        <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
            <q-card>
                <q-card-section style="padding: 10px;" class="row items-center q-pb-none text-h6">
                Atenção
                </q-card-section>

                <q-card-section style="padding: 10px;">
                    {{ msgError }}
                    
                </q-card-section>

                <q-card-actions style="padding: 5px;" align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        </form>
            
        </div>  
    </main>  
     
</template>

<script setup lang="ts">

    //--------------------------------------- VAR REATIVAS E IMPORTAÇÕES+ -------------------------------------------
    import { ref } from 'vue'
    import router from "../router/router"
    import { ControllerLogin } from '../controller/ControllerLogin'


    const loading = ref(false)
    const keyPassword = ref("email")
    const keyGoogle = ref("google")
    const inputEmail = ref("")
    const inputPassword = ref("")
    const isPwd = ref(true)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailField = ref("")
    const passwordField = ref("")
    const dialog = ref(false)
    const msgError = ref("")
    const listMsg = 
    {
        userFoud: "Usuário não encontrado no banco de dados.",
        errorGoolge: "Erro ao validar com o google. Se o erro persistir, contato o suporte técnico.",
        errorGeral: "Erro não programado. Se o erro persistir, contate o suporte técnico."
    } 

    // ---------------------------------------------------------------------------------------------------


    //----------------------- FUNÇÕES ------------------------------------------------------

    async function loginEnter() {
        LoginEmailSenha()
    }

    function validEmailRule(val: string) {
        return ((val && regexEmail.test(val)) || "Campo e-mail é obrigatório")
    }

    function validPasswordRule(val: string) {
        return (val && val.length > 6) || "Senha não atende aos requisitos"
    }

    function validData(){

        return emailField.value.validate() && passwordField.value.validate()
    }
  
    async function LoginEmailSenha() {

        const isValidData = validData() 

        if (!isValidData) {
            return
        }
      
        try {

            loading.value = true;

            const result = await ControllerLogin.signEmailESenha(inputEmail.value, inputPassword.value) 

           if (result) {

            router.push({name: "Pagina-Principal"})

           } else {

            alert("Algo deu errado no login")
            
           }

        } catch (error) {

            dialog.value = true
            msgError.value = listMsg.errorGeral
            console.log("Erro ao validar com user e password" + error)
            
        } finally {

            loading.value = false;
        }

        sessionStorage.setItem("type password", keyPassword.value)
    }

    async function loginGoogle() {

        try {
            loading.value = true
        
            const result = await ControllerLogin.signGoolge()

            if (result) {
                router.push({name: "Pagina-Principal"})
            } else {
                msgError.value = listMsg.errorGoolge
            }

        } catch (error) {   
            console.log("Erro ao validar com o google" + error)
            
            dialog.value = true
            msgError.value = listMsg.errorGoolge

        }finally {

            loading.value = false
        }

        sessionStorage.setItem("type google", keyGoogle.value)
    }

 
    sessionStorage.removeItem("type password")
    sessionStorage.removeItem("type google")
  
</script>

<style src="/src/views/PagLogin/PagLogin.css" scoped>

</style>