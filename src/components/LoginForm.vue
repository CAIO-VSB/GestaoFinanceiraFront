<template>

    <main class="login__main">
        
        <div class="login__container">

            <form @submit.prevent="submitDados">

            <div>
                <h2 class="login__title">Acesso ao sistema</h2>
            </div>

            <div class="login__welcome">
                <h3 class="login__subtitle">Bem-vindo de volta!</h3>
                <p class="login__description">Acesse sua conta para continuar</p>
            </div>

            <div class="login__form-group"> 
            <!--div que controla os forms itens-->

            <div class="login__form-item">
                <q-input class="login__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail *" 
                autocomplete="email"
                name="email"
                title="Insira um e-mail válido"
                :rules="[validEmailRule]"
                clearable
                lazy-rules
                ref="emailField"
                @keyup.enter="loginEnter"
                />
            </div>

            <div class="login__form-item">
            <q-input class="login__input-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputPassword" label="Insira sua senha *" 
                title="Insira uma senha de 6 dígitos"
                hint="Info.: A senha deve conter no mínimo 6 caracteres"
                :rules="[validPasswordRule]"
                lazy-rules
                clearable
                @keyup.enter="loginEnter"
                ref="passwordField"
                >

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
                <button @keyup.enter="loginEnter" @click="submitGoogle" type="button" class="login__bnt--google">
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
        <div class="login__right-side">
            <div class="login__div-img">
                <img class="login__img-right" src="/src/assets/logo-financa-sidebar.png" alt="">    
            </div>
            <h2>Tenha controle total das suas finanças</h2>
            <div class="login__scroll-infinite">
                <h5>Gerencie seus gastos ✅</h5>
                <h5>Acompanhe seus lançamentos ✅</h5>
                <h5>Alcance seus objetivos financeiros com facilidade ✅</h5>
                
                <h5>Gerencie seus gastos ✅</h5>
                <h5>Acompanhe seus lançamentos ✅</h5>
                <h5>Alcance seus objetivos financeiros com facilidade ✅</h5>
            </div>
        </div>

    </main>  
     
</template>

<script setup lang="ts">

    //--------------------------------------- VAR REATIVAS E IMPORTAÇÕES+ -------------------------------------------
    import { ref } from 'vue'
    import router from "../router/router"
    import { ControllerLogin } from '../controller/ControllerLogin'
 
    const loading = ref(false)
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
        submitDados()
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
  
    async function submitDados() {

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
                dialog.value = true
                msgError.value = listMsg.userFoud
           }

        } catch (error) {

            dialog.value = true
            msgError.value = listMsg.errorGeral
            console.log("Erro ao validar com user e password" + error)
            
        } finally {

            loading.value = false;
        }
    }

    async function submitGoogle() {

        try {
            loading.value = true
        
            const result = await ControllerLogin.signGoolge()

            if (result) {

                router.push({name: "Pagina-Principal"})

            }

        } catch (error) {   
            console.log("Erro ao validar com o google" + error)
            
            dialog.value = true
            msgError.value = listMsg.errorGoolge

        }finally {

            loading.value = false
        }
    }
  
</script>

<style src="/src/views/PagLogin/PagLogin.css" scoped>

</style>