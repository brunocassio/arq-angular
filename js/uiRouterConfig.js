'use strict';

detranApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    //###################### INICIO DA DEFINICAO DE ROTAS ######################
    $urlRouterProvider.otherwise("/servidor/pesquisarServidor");

    $stateProvider
        .state('pesquisarServidor', {
            url: "/servidor/pesquisarServidor",
            templateUrl: "/sgp/pages/servidor/pesquisarServidor.html",
            controller: 'PesquisarServidorController',
            params: {carregarPesquisa: false}
        })
        .state('editarServidor', {
            url: "/servidor/editarServidor",
            templateUrl: "/sgp/pages/servidor/editarServidor.html",
            controller: 'EditarServidorController'
        })

        .state('pesquisarAlocacao', {
            url: "/alocacao/pesquisarAlocacao",
            templateUrl: "/sgp/pages/alocacao/pesquisarAlocacao.html",
            controller: 'PesquisarAlocacaoController',
            params: {carregarPesquisa: false}
        })
        .state('editarAlocacao', {
            url: "/alocacao/editarAlocacao",
            templateUrl: "/sgp/pages/alocacao/editarAlocacao.html",
            controller: 'EditarAlocacaoController'
        })
        .state('anexarDocumento', {
            url: "/alocacao/anexarDocumento",
            templateUrl: "/sgp/pages/alocacao/anexarDocumento.html",
            controller: 'AnexarDocumentoController'
        })
        .state('acompanharAlocacao', {
            url: "/alocacao/acompanharAlocacao",
            templateUrl: "/sgp/pages/alocacao/acompanharAlocacao.html",
            controller: 'AcompanharAlocacaoController',
            params: {faseAlocacao: null}
        })

        .state('pesquisarVaga', {
            url: "/vaga/pesquisarVaga",
            templateUrl: "/sgp/pages/vaga/pesquisarVaga.html",
            controller: 'PesquisarVagaController',
            params: {carregarPesquisa: false, carregarBotaoVoltar: false}
        })
        .state('editarVaga', {
            url: "/vaga/editarVaga",
            templateUrl: "/sgp/pages/vaga/editarVaga.html",
            controller: 'EditarVagaController'
        });

    //###################### FIM DA DEFINICAO DE ROTAS ######################
}]);