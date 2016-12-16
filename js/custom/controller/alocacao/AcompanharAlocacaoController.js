/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("AcompanharAlocacaoController", ['$scope', '$state', '$stateParams',
    function ($scope, $state, $stateParams) {

        $scope.listaFaseAlocacao = ['aprovacao', 'homologacao', 'saida', 'chegada'];
        $scope.faseAlocacao = $stateParams.faseAlocacao;

        $scope.listaFuncao = ['Selecione', 'Analista', 'Administrador', 'Estoquista'];
        $scope.listaUnidadeDestino = ['Selecione', 'Diretoria', 'Gerência de Desenvolvimento', 'Almoxarifado'];


        $scope.carregarPagina = function () {

            $scope.servidor = {
                nome: 'Fulano Alves',
                cpf: '123.456.789-50'
            };


            switch ($scope.faseAlocacao) {
                case 'aprovacao':
                    $scope.alocacao = {
                        unidadeOrigem: "Gerência de Manutenção",
                        unidadeDestino: "Selecione",
                        desabilitarUnidadeDestino: false,
                        dataMovimentacao: '',
                        desabilitarDataMovimentacao: false,
                        funcao: "Selecione",
                        desabilitarFuncao: false,
                        situacao: 'Aprovado',
                        desabilitarSituacao: false
                    };

                    $scope.listaSituacao = ['Aprovado', 'Solicitado', 'Cancelado'];

                    break;

                case 'homologacao':

                    $scope.alocacao = {
                        unidadeOrigem: "Gerência de Manutenção",
                        unidadeDestino: "Diretoria",
                        desabilitarUnidadeDestino: true,
                        dataMovimentacao: '05/12/2016',
                        desabilitarDataMovimentacao: true,
                        funcao: "Analista",
                        desabilitarFuncao: true,
                        situacao: 'Homologado',
                        desabilitarSituacao: false
                    };

                    $scope.listaSituacao = ['Homologado', 'Aprovado', 'Cancelado'];

                    break;

                case 'saida':
                case 'chegada':
                    $scope.alocacao = {
                        unidadeOrigem: "Gerência de Manutenção",
                        unidadeDestino: "Diretoria",
                        desabilitarUnidadeDestino: true,
                        dataMovimentacao: '05/12/2016',
                        desabilitarDataMovimentacao: true,
                        funcao: "Analista",
                        desabilitarFuncao: true,
                        situacao: 'Homologado',
                        desabilitarSituacao: true
                    };

                    $scope.listaSituacao = ['Homologado'];
                    break;

                default:
                    $scope.alocacao = {};
                    $scope.listaSituacao = [];
            }
        };

        $scope.voltarPesquisaAlocacao = function () {
            $state.go('pesquisarAlocacao', {'carregarPesquisa': true});
        };

        $scope.carregarPagina();
    }]);