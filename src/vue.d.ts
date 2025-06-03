declare module "*.vue" { //Estou criando um modulo genérico
    import { DefineComponent } from "vue"; // Importando um tipo especial do Vue.
    const component: DefineComponent<{}, {}, any>; //Especificando qual o tipo do componente.
    export default component; //Exportando esse componente goblal

    /*
    Resumindo: Estou criando um módulo para que o ts saiba que o componente tem algum tipo de retorno. Ele não precisa saber qual o retorno, ex.: string, int e etc. Ele só precisa saber que o componente vue vai retornar algo, assim evitando erro de tipagem ao importar arquivos .Vue
    */
}