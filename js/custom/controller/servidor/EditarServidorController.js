/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("EditarServidorController", ['$scope', '$state', '$uibModal',
    function ($scope, $state, $uibModal) {

        // ------------------------------- variaveis
        var modalInstance;

        $scope.servidor = {};
        $scope.servidor.telefone = {};

        $scope.listaTelefoneServidor = [
            {
                tipo: 'Fixo',
                ddd: '62',
                numero: '3565-3565'
            },
            {
                tipo: 'Celular',
                ddd: '62',
                numero: '8467-8467'
            }
        ];

        // ---------------------------------------- funcoes
        $scope.carregarPagina = function () {
            $scope.carregarStepUm();
        };

        $scope.voltarPesquisaServidor = function () {
            $state.go('pesquisarServidor', {carregarPesquisa: true});
        };

        $scope.carregarStepUm = function () {
            $scope.limparClass();
            $scope.stepUmClass = 'active';
            $scope.step = 1;
        };

        $scope.carregarStepDois = function () {
            $scope.limparClass();
            $scope.stepDoisClass = 'active';
            $scope.step = 2;
        };

        $scope.carregarStepTres = function () {
            $scope.limparClass();
            $scope.stepTresClass = 'active';
            $scope.step = 3;
        };

        $scope.carregarStepQuatro = function () {
            $scope.limparClass();
            $scope.stepQuatroClass = 'active';
            $scope.step = 4;
        };

        $scope.limparClass = function () {
            $scope.stepUmClass = '';
            $scope.stepDoisClass = '';
            $scope.stepTresClass = '';
            $scope.stepQuatroClass = '';
        };

        $scope.abrirEditarTelefone = function (objeto) {

            if (objeto && objeto.numero) {
                $scope.servidor.telefone.tipo = objeto.tipo;
                $scope.servidor.telefone.ddd = objeto.ddd;
                $scope.servidor.telefone.numero = objeto.numero;
            }

            modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalEditarTelefone',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                scope: this
            });
        };

        $scope.fechar = function () {
            modalInstance.dismiss('cancel');
        };

        //----------------------------- chamada incial
        $scope.carregarPagina();

    }]);