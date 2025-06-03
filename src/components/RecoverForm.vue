<template>
    <form @submit.prevent="SubmitDados">
        <div class="recover__form-group"> 
            <div class="recover__form-item">
                <q-input class="recover__input-email" outlined v-model="inputEmail" label="Insira seu e-mail *" 
                    autocomplete="email"
                    name="email"
                    title="Insira seu e-mail aqui"
                    hint="Dica: formato de e-mail válido: email@gmail.com"
                    :rules="[validEmailRule]"
                    clearable
                    lazy-rules
                    ref="emailField"
                />
            </div>

            <div class="recover__form-button">
                <q-btn 
                    style="padding: 10px; width: 100%;"
                    color="primary" label="Recuperar Senha"
                    @click="SubmitDados"
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

    import {  ref } from 'vue';
    import { ControllerRecoverPassword } from '../controller/ControllerRecoverPassword';

    const inputEmail = ref("");
    const loading = ref(false);
    const emailField = ref("")
    const regexEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const dialog = ref(false)
    const msgError = ref("")
    const listMsg = 
    {
        submitSuccess: "Solicitação enviada com sucesso. Acesse seu e-mail para continuar o processo.",
        submitError: "Ocorreu um erro ao enviar a solicitação, por favor, tente novamente.",
        errorGeral: "Erro não programado. Se o mesmo persistir, contate o suporte técnico."
    } 

    function validEmailRule(val: string) {
        return (val && regexEmail.test(val) || "Campo e-mail é obrigatório ou não atende os requisitos")
    }

    function validData() {
        return emailField.value.validate()
    }

    async function SubmitDados() {

        const isValid = validData();

        if (!isValid) {
            return
        }

        try {
            
            loading.value = true;

            const result = await ControllerRecoverPassword.recoverpassword(inputEmail.value)

            if (result) {

                dialog.value = true
                msgError.value = listMsg.submitSuccess

            } else {
                
                dialog.value = true
                msgError.value = listMsg.submitError
                return false
            }

        } catch (error) {

            dialog.value = true
            msgError.value = listMsg.errorGeral
            console.log("Erro ao enviar solicitação" + error)

        } finally {

            loading.value = false;
        }
    }

</script>


<style src="/src/views/RecoverPassword/RecoverPassword.css" scoped></style>