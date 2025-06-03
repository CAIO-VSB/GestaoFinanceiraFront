<script type="ts" setup>
    import { ref } from 'vue';
    import { useSearchUser } from '../composable/UserDataComposable'

    const drawer = ref(false)
    const miniState = ref(false)
    const activeItem = ref("")

    function Sair() {
      alert("Saindo com sucesso")
    }

</script>

<template>
   <div class="home__container-main">
    <q-layout view="hHh Lpr lff" container style="height: 100vh;" >
      <q-header elevated>
        <q-toolbar style="background-color: #37474F;">
          <q-btn title="Recolher ou expandir menu" flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn title="Mais opções" class="home__bnt-more" flat round dense icon="more_vert">
            <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list style="min-width: 120px" class="home__q-list-more-menu">
            <q-item class="home__hover-btn-more-menu-main" clickable @click="Sair" style="cursor: pointer;">
              <q-item-section style="display: flex; flex-direction: row; gap: 20px; align-items: center;">Sair
                <q-icon name="logout" />
              </q-item-section>
            </q-item>
            <q-item class="home__hover-btn-more-menu-main" clickable style="cursor: pointer;">
              <q-item-section>Meus dados</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
          </q-btn>
          <q-toolbar-title>Gerenciamento Financeiro</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="500"
        elevated
        :to="{name: 'Inicio'}"
        style="overflow: hidden !important;"
      >
      <div class="home__dados-user">
        <div class="home__img-user">
          <q-avatar size="130px" font-size="55px" color="teal" text-color="white">
            <img src="/src/assets/mili.webp" alt="">
          </q-avatar>
        </div>
        <div class="home__name-user">
          {{ userData?.nome }}
        </div>
      </div>
        <q-scroll-area class="fit">
          <q-list padding >
            <q-item @click="activeItem = 'Inicio'" :class="{home__itens_active: activeItem === 'Inicio'}" :to="{name: 'Inicio'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="home" class="home__label-icons"/>
              </q-item-section>

              <q-item-section class="home__label-itens">
                Início
              </q-item-section>
            </q-item>

            <q-item @click="activeItem = 'Cadastros'" :class="{home__itens_active: activeItem === 'Cadastros'}" :to="{name: 'Cadastros'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="add_circle" class="home__label-icons"/>
              </q-item-section>

              <q-item-section class="home__label-itens">
                Cadastros
              </q-item-section>
            </q-item>

            <q-item @click="activeItem = 'Lancamentos'" :class="{home__itens_active: activeItem === 'Lancamentos'}" :to="{name: 'Lancamentos'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="add_card" class="home__label-icons"/>
              </q-item-section>

              <q-item-section class="home__label-itens">
                Lançamentos
              </q-item-section>
            </q-item>

            <q-item @click="activeItem = 'Resumo'" :class="{home__itens_active: activeItem === 'Resumo'}" :to="{name: 'Resumo-Financeiro'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="insert_chart" class="home__label-icons"/>
              </q-item-section>

              <q-item-section class="home__label-itens">
                Resumo financeiro
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>


<style src="/src/views/HomePage/HomePage.css" scoped></style>