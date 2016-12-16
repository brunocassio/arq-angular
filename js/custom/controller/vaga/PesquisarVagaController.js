/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("PesquisarVagaController", ['$scope', '$state', '$stateParams', '$uibModal',
    function ($scope, $state, $stateParams, $uibModal) {

        // ------------------------------- variaveis
        var modalInstance;

        $scope.listaVaga = [
            {
                unidade: "Gerência de Veículos",
                funcao: "Analista de Trânsito",
                cargaHoraria: "8",
                escolaridade: "Nível Médio",
                vinculo: "Comissionado",
                quantidadeVagaPreenchida: "7",
                quantidadeVagaDisponiveis: "3"
            },
            {
                unidade: "Gerência de Transportes",
                funcao: "Gerente",
                cargaHoraria: "8",
                escolaridade: "Nível Superior",
                vinculo: "Celetista",
                quantidadeVagaPreenchida: "3",
                quantidadeVagaDisponiveis: "2"
            },
            {
                unidade: "Gerência de Tecnologia da Informação",
                funcao: "Analista de Teste",
                cargaHoraria: "4",
                escolaridade: "Nível Superior Cursando",
                vinculo: "Estagiário",
                quantidadeVagaPreenchida: "2",
                quantidadeVagaDisponiveis: "3"
            },
            {
                unidade: "Gerência de Recursos Humanos",
                funcao: "Auxilar Administrativo",
                cargaHoraria: "8",
                escolaridade: "Nível Superior",
                vinculo: "Efetivo",
                quantidadeVagaPreenchida: "4",
                quantidadeVagaDisponiveis: "1"
            }
        ];

        // ---------------------------------------- funcoes
        $scope.carregarPagina = function () {
            $scope.listaVagaResultado = [];

            if ($stateParams && $stateParams.carregarPesquisa) {
                $scope.listaVagaResultado = $scope.listaVaga;
            }

            if ($stateParams && $stateParams.carregarBotaoVoltar) {
                $scope.carregarBotaoVoltar = true;
            }
        };

        $scope.novaVaga = function () {
            $state.go('editarVaga');
        };

        $scope.editarVaga = function () {
            $state.go('editarVaga');
        };

        $scope.voltarPesquisaAlocacao = function () {
            $state.go('pesquisarAlocacao', {carregarPesquisa: true});
        };

        $scope.listarVaga = function () {
            $scope.listaVagaResultado = $scope.listaVaga;
        };

        $scope.visualizarVaga = function (vaga) {

            $scope.listaVaga = [
                {
                    cpf: "12345678950",
                    cpfFormatado: "123.456.789-50",
                    nome: "Fulano Alves",
                    unidade: "Gerência de Veículos",
                    funcao: "Analista de Trânsito",
                    cargaHoraria: "8",
                    escolaridade: "Nível Médio",
                    vinculo: "Comissionado",
                    quantidadeVagaPreenchida: "7",
                    quantidadeVagaDisponiveis: "3"
                },
                {
                    cpf: "78945612350",
                    cpfFormatado: "789.456.123-50",
                    nome: "Ciclano Alves",
                    unidade: "Gerência de Transportes",
                    funcao: "Gerente",
                    cargaHoraria: "8",
                    escolaridade: "Nível Superior",
                    vinculo: "Celetista",
                    quantidadeVagaPreenchida: "3",
                    quantidadeVagaDisponiveis: "2"
                },
                {
                    cpf: "04698048155",
                    cpfFormatado: "046.980.481-55",
                    nome: "João Victor Alves",
                    unidade: "Gerência de Tecnologia da Informação",
                    funcao: "Analista de Teste",
                    cargaHoraria: "4",
                    escolaridade: "Nível Superior Cursando",
                    vinculo: "Estagiário",
                    quantidadeVagaPreenchida: "2",
                    quantidadeVagaDisponiveis: "3"
                },
                {
                    cpf: "78945612350",
                    cpfFormatado: "789.456.123-50",
                    nome: "Beltrano Alves",
                    unidade: "Gerência de Recursos Humanos",
                    funcao: "Auxilar Administrativo",
                    cargaHoraria: "8",
                    escolaridade: "Nível Superior",
                    vinculo: "Efetivo",
                    quantidadeVagaPreenchida: "4",
                    quantidadeVagaDisponiveis: "1"
                }

            ];

            modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalVisualizarVaga',
                backdrop: 'static',
                keyboard: false,
                windowClass: 'extra-modal',
                scope: this
            });
        };

        $scope.fechar = function () {
            modalInstance.dismiss('cancel');
        };

        //----------------------------- chamada incial
        $scope.carregarPagina();

    }]);