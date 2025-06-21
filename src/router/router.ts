import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import PagLogin from "../views/PagLogin/PagLogin.vue";
import NewUser from "../views/NewUser/NewUser.vue";
import RecoverPassword from "../views/RecoverPassword/RecoverPassword.vue";


const routes: RouteRecordRaw[] = [

    {
        path: "/",
        name: "Página-de-login",
        component: PagLogin
    },

    {
        path: "/teste",
        name: "teste",
        component: () => import('@/components/teste.vue')
    },

    {
        path: "/Novo-Usuario",
        name: "Novo-Usuario",
        component: NewUser
    },

    {
        path: "/Recuperar-Senha",
        name: "Recuperar-Senha",
        component: RecoverPassword
    },

    {
        path: "/Pagina-Principal",
        name: "Pagina-Principal",
        component: () => import('@/components/PaginaPrincipal.vue'),
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
                path: "Cartoes",
                name: "Cartoes",
                 component: () => import("@/components/Cartoes-de-Credito.vue")
            },
            {
                path: "Cadastros",
                name: "Cadastros",
                component: () => import('@/components/Cadastros.vue'),
                children: [
                    {
                        path: "Categorias",
                        name: "Categorias",
                        component: () => import("@/components/Categorias.vue")
                    },
                    {
                        path: "Contas",
                        name: "Contas",
                        component: () => import("@/components/Contas.vue")
                    },
                ]
            },
            {
                path: "Minha-Conta",
                name: "Minha-Conta",
                component: () => import("@/components/MinhaConta.vue")
            }
            ]
    },
   
    
]

// Utilizar ladz loading em todos os componentes
// O que isso? (Carregamento lento) no componentes ajudam na perfomace da aplicação, onde cada componente é renderizado no ato do clique e não quando a aplicação inicia.

const router = createRouter({
    history: createWebHistory(), routes
})

export default router