/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("EditarVagaController", ['$scope', '$state',
    function ($scope, $state) {

        $scope.carregarPagina = function () {
        };

        $scope.voltarPesquisaVaga = function () {
            $state.go('pesquisarVaga', {'carregarPesquisa': true});
        };

        $scope.carregarPagina();
    }]);