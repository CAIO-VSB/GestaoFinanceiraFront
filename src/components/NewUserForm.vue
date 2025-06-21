<template>

    <form @submit.prevent="SubmitDados">

        <div class="create-user__form-group"> 
        <!--div que controla os forms itens-->

        <div class="create-user__form-item">
                <q-input v-model="inputUser" outlined type="email" prefix="Nome:"
                autocomplete="username"
                name="username"
                title="Insira um e-mail válido"
                :rules="[validNameRule]"
                clearable
                lazy-rules
                ref="userField"
                @keyup.enter="loginEnter">
                <template v-slot:prepend>
                <q-icon name="person" />
                </template>
            </q-input>
        </div>
        
        <div class="create-user__form-item">
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
            <q-icon name="email" />
            </template>
            </q-input>
        </div>

        <div class="create-user__form-item">
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
        <div class="create-user__form-item">
             <q-input :type="isPwd ? 'password' : 'text' " v-model="inputConfirmPassword" outlined  prefix="Repita a Senha:"
                title="Insira um e-mail válido"
                :rules="[validConfirmPasswordRule]"
                clearable
                lazy-rules
                ref="confirmPasswordField"
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

    function loginEnter() {
        SubmitDados()
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