<template>
    <main class="recover-main">
        <div class="recover__container">
            <div class="recover__header">
                <h2 class="recover__title">Recuperação de Senha</h2>
            </div>

            <div class="recover__content">
                <div class="recover__welcome">
                    <h3 class="recover__subtitle">Esqueceu sua senha?</h3>
                    <p class="recover__description">Não se preocupe! Insira seu e-mail abaixo e enviaremos as instruções para recuperação.</p>
                </div>

                <RecoverForm />
                
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
    import RecoverForm from '../../components/RecoverForm.vue';
</script>

<style src="./RecoverPassword.css" scoped>

</style>

