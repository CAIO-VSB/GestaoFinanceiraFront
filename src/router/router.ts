import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import PagLogin from "../views/PagLogin/PagLogin.vue";
import NewUser from "../views/NewUser/NewUser.vue";

const routes: RouteRecordRaw[] = [

    {
        path: "/",
        name: "Página-de-login",
        component: PagLogin
    },

    {
        path: "/Novo-Usuario",
        name: "Novo-Usuario",
        component: NewUser
    },

    {
        path: "/Recuperar-Senha",
        name: "Recuperar-Senha",
        component: () => import('@/views/RecoverPassword/RecoverPassword.vue')
    },

    {
        path: "/Pagina-Principal",
        name: "Pagina-Principal",
        component: () => import('@/components/SiderBar.vue'),
        children: [
            {
                path: "Inicio",
                name: "Inicio",
                component: () => import('@/components/Inicio.vue')
            },
            {
                path: "Resumo-Financeiro",
                name: "Resumo-Financeiro",
                component: () => import('@/components/ResumoFinanceiro.vue')
            },
            {
                path: "Lancamentos",
                name: "Lancamentos",
                component: () => import('@/components/Lancamentos.vue')
            },
            {
                path: "Cadastros",
                name: "Cadastros",
                component: () => import('@/components/Cadastros.vue')
            }
        ]
    },
    {
        path: "/teste",
        name: "teste",
        component: () => import('@/components/teste.vue')
    }
    
]

// Utilizar ladz loading em todos os componentes
// O que isso? (Carregamento lento) no componentes ajudam na perfomace da aplicação, onde cada componente é renderizado no ato do clique e não quando a aplicação inicia.

const router = createRouter({
    history: createWebHistory(), routes
})

export default router