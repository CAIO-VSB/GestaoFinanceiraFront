<script setup>
  import { computed, ref, watch } from 'vue'
  import { useSearchUser } from '../composable/UserDataComposable'

  const drawer = ref(true)
  const rail = ref(false)
  const openGroups = ref([])
  const currentLoginType = ref("")
  const dataUser = ref("")

  const { loading, userDataCurrent } = useSearchUser()


</script>

<template>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        class="sider-bar-navigation"
        style="background-color: #ECEFF1; box-shadow: 2px 0px 5px rgba(0,0,0,0.05);"
      >
        <v-list>
          <div style="position: absolute; display: flex; margin-left: 50%; margin-top: 5%;">
            <template v-if="loading">
            <q-spinner-hourglass
              color="black"
              size="2em"
              style="display: flex; align-items: center; justify-content: center;"
              />
          </template>
          </div>
        
          <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            >
            <template #title> 
              <span class="title-name-user">{{ userDataCurrent }}</span>
            </template>
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="default" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Visão geral"
            value="visao geral"
            :to="{name: 'Inicio'}"
            style="font-size: 0.875rem;"
          >
           <v-tooltip
            activator="parent"
            location="end"
          >Visão Geral</v-tooltip>
        </v-list-item>
          <v-list-group style="font-size: 0.875rem;" value="Cadastros" v-model:opened="openGroups">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Cadastros"
              prepend-icon="mdi-plus-box"
            > 
          </v-list-item>
          </template>
           <v-list-item
            prepend-icon="mdi-tag-outline"
            title="Categorias"
            value="categorias"
            :to="{name: 'Categorias'}"
            style="font-size: 0.875rem;"
          >
           <v-tooltip
        activator="parent"
        location="end"
      >Categorias</v-tooltip>
        </v-list-item>
           <v-list-item
            prepend-icon="mdi mdi-account-cash"
            title="Contas"
            value="contas"
            :to="{name: 'Contas'}"
             style="font-size: 0.875rem;"
          >
           <v-tooltip
        activator="parent"
        location="end"
      >Contas</v-tooltip>
        </v-list-item>
        </v-list-group>
        <v-list-item
            prepend-icon="mdi mdi-credit-card-multiple"
            title="Cartões de crédito"
            value="cartoes de credito"
            :to="{name: 'Cartoes'}"
             style="font-size: 0.875rem;"
          >
           <v-tooltip
        activator="parent"
        location="end"
      >Cartões de Crédito</v-tooltip>
        </v-list-item>
          <v-list-item
            prepend-icon="mdi-cash-plus"
            title="Lançamentos"
            value="lancamentos"
            :to="{name: 'Lancamentos'}"
             style="font-size: 0.875rem;"
          >
           <v-tooltip
        activator="parent"
        location="end"
      >Lançamentos</v-tooltip>
        </v-list-item>
          <v-list-item
            prepend-icon="mdi-finance"
            title="Resumo financeiro"
            value="resumo financeiro"
            :to="{name: 'Resumo-Financeiro'}"
             style="font-size: 0.875rem;"
          >
           <v-tooltip
        activator="parent"
        location="end"
      >Resumo Financeiro</v-tooltip>
        </v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="Minha conta"
            value="minha conta"
            :to="{name: 'Minha-Conta'}"
             style="font-size: 0.875rem;"
          >
           <v-tooltip
        activator="parent"
        location="end"
      >Minha Conta</v-tooltip>
        </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh; background-color: #E0E0E0; letter-spacing: .01rem;">
        <router-view></router-view>
      </v-main>
    </v-layout> 
</template>


<style src="/src/views/HomePage/HomePage.css" scoped></style>