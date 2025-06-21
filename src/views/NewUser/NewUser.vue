<template>
    <main class="create-user">
       
        <div class="create-user__container">

            <div>
                <h2 class="create-user__title">Criar Novo Usuário</h2>
            </div>

            <div class="create-user__welcome">
                <h3 class="create-user__subtitle">Crie sua conta</h3>
                <p class="create-user__description">Preencha os campos abaixo para criar sua conta</p>
            </div>

            <NewUserForm />
            
        </div>   

    </main>  
</template>

<script setup lang="ts">
    import NewUserForm from '../../components/NewUserForm.vue';

</script>

<style src="./NewUser.css" scoped></style>
