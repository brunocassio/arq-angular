/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("EditarAlocacaoController", ['$scope', '$state',
    function ($scope, $state) {

        $scope.carregarPagina = function () {
            $scope.alocacao = '';
            $scope.pesquisa = '';
        };

        $scope.voltarPesquisaAlocacao = function () {
            $state.go('pesquisarAlocacao');
        };

        $scope.anexarDocumento = function () {
            $state.go('anexarDocumento');
        };

        $scope.carregarPagina();
    }]);