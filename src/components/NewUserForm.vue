<template>

    <form @submit.prevent="SubmitDados">

        <div class="create-user__form-group"> 
        <!--div que controla os forms itens-->

        <div class="create-user__form-item">
            <q-input class="create-user__input-user" outlined  v-model="inputUser" label="Insira seu nome" 
            autocomplete="username"
            name="username"
            title="Insira um nome"
            hint="Dica: Se possível, insira somente o primeiro nome e sobrenome"
            :rules="[validNameRule]"
            lazy-rules
            ref="userField"
            clearable
            />
        </div>
        
        <div class="create-user__form-item">
            <q-input class="create-user__input-email" outlined  v-model="inputEmail" label="Insira seu e-mail" 
            autocomplete="email"
            name="email"
            title="Insira um e-mail válido"
            hint="Dica de e-mail válido: user123@gmail.com"
            :rules="[validEmailRule]"
            lazy-rules
            ref="emailField"
            clearable
            />
        </div>

        <div class="create-user__form-item">
            <q-input class="create-user__input-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputPassword" label="Insira uma senha" 
            autocomplete="password"
            name="password"
            title="Insira uma senha de 6 dígitos"
            hint="Info.: Insira um senha de no mínimo 6 dígitos"
            :rules="[validPasswordRule]"
            lazy-rules
            ref="passwordField"
            clearable
            >
            <template v-slot:append>
                    <q-icon style="cursor: pointer;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>   
        </div>
        <div class="create-user__form-item">
            <q-input class="create-user__input-confirm-password" outlined :type="isPwd ? 'password' : 'text'" v-model="inputConfirmPassword" label="Repita a senha" 
            autocomplete="password"
            name="password"
            title="Repita sua senha"
            hint="Info.: Repita novamente a senha"
            :rules="[validConfirmPasswordRule]"
            lazy-rules
            ref="confirmPasswordField"
            clearable
            >
            <template v-slot:append>
                    <q-icon style="cursor: pointer;" :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>   
        </div>

        <div class="create-user__form-button">
            <q-btn 
            style="padding: 10px; width: 100%;" color="primary" label="Criar Conta" @click="SubmitDados"
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
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { ControllerCreateUser } from '../controller/ControllerCreateUser';

    const loading = ref(false)
    const inputEmail = ref("")
    const inputPassword = ref("")
    const inputUser = ref("")
    const inputConfirmPassword = ref("")
    const emailField = ref("")
    const userField = ref("")
    const passwordField = ref("")
    const isPwd = ref(true)  
    const confirmPasswordField = ref("")
    const msgError = ref("")
    const dialog = ref(false)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const listMsg = 
    {
        submitSuccess: "Usuário criado com sucesso. Seja bem-vindo!",
        submitError: "Erro ao criar usuário. Verifique as informações e tente novamente",
        errorGeral: "Erro não programado. Se o erro persistir, contate o suporte técnico."
    } 


    function validEmailRule(val: string) {
        return (val && regexEmail.test(val) || "E-mail inválido ou vazio")
    }

    function validNameRule(val: string) {
        return (val &&  val.length > 0 ||  "Campo nome obrigatório")
    }

    function validPasswordRule(val: string) {
  
        return (val.length > 6 || "Minímo de 6 caracteres")
    }

    function validConfirmPasswordRule(val: string) {
    
        return (val === inputPassword.value || "As senhas digitadas são diferentes")
    }

    function validData() {

       return userField.value.validate() && emailField.value.validate()  && passwordField.value.validate() && confirmPasswordField.value.validate()

    }
  

    async function SubmitDados() {

        const isValidData = validData();

        if (!isValidData) {
            return;
        }

        try {

            loading.value = true;

            const result = await ControllerCreateUser.createuser(inputUser.value, inputEmail.value, inputPassword.value)

            if (result) {
                dialog.value = true
                msgError.value = listMsg.submitSuccess
            } 

        } catch (error) {

            dialog.value = true
            msgError.value = listMsg.submitSuccess
            console.log("Erro ao validar com user e password" + error)

        } finally {

            loading.value = false;
        }
    }

</script>


<style src="/src/views/NewUser/NewUser.css" scoped></style>