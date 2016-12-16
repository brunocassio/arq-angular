/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("AnexarDocumentoController", ['$scope', '$state',
    function ($scope, $state) {

        $scope.carregarPagina = function () {
            $scope.alocacao = '';
            $scope.pesquisa = '';
            $scope.listaAnexoResultado = $scope.listaAnexo;

            $scope.nome = "João Victor Alves";
        };

        $scope.listaAnexo = [
            {
                nome: "Memorando.png",
                data: "15/04/2016",
                tipo: "Memorando"
            },
            {
                nome: "Evidência.jpg",
                data: "01/07/2016",
                tipo: "Ofício"
            },
            {
                nome: "Imagem.png",
                data: "21/09/2016",
                tipo: "RG"
            }
        ];

        $scope.voltarPesquisaAlocacao = function () {
            $state.go('pesquisarAlocacao', {carregarPesquisa: true});
        };

        $scope.carregarPagina();

    }]);