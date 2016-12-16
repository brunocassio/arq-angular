/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("PesquisarServidorController", ['$scope', '$state', '$stateParams',
    function ($scope, $state, $stateParams) {

        $scope.carregarPagina = function () {
            $scope.servidor = '';
            $scope.pesquisa = '';
            $scope.listaServidorResultado = [];

            if ($stateParams && $stateParams.carregarPesquisa) {
                $scope.listaServidorResultado = $scope.listaServidor;
            }
        };

        // ******************************************* variaveis globais
        $scope.listaServidor = [
            {
                cpf: "04698048155",
                cpfFormatado: "046.980.481-55",
                nome: "João Victor Alves",
                lotacao: "Gerência de Desenvolvimento de Software"
            },
            {
                cpf: "04604604650",
                cpfFormatado: "046.046.046-50",
                nome: "Helen Moura Jordão",
                lotacao: "Gerência de Levantamento de Requisitos"
            },
            {
                cpf: "12345678950",
                cpfFormatado: "123.456.789-50",
                nome: "Fulano Alves",
                lotacao: "Gerência de Manutenção"
            },
            {
                cpf: "78945612350",
                cpfFormatado: "789.456.123-50",
                nome: "Ciclano Alves",
                lotacao: "Gerência de Teste"
            },
            {
                cpf: "78945612350",
                cpfFormatado: "789.456.123-50",
                nome: "Beltrano Alves",
                lotacao: "Gerência de Hardware"
            }
        ];

        // ******************************************* métodos de consulta
        $scope.listarServidor = function () {
            $scope.listaServidorResultado = [];

            if ($scope.pesquisa.cpf) {
                filtrarServidor("cpf", $scope.pesquisa.cpf);
            } else {
                if ($scope.pesquisa.nome) {
                    filtrarServidor("nome", $scope.pesquisa.nome);
                } else {
                    $scope.listaServidorResultado = $scope.listaServidor;
                }
            }
        };

        function filtrarServidor(chave, valor) {
            angular.forEach($scope.listaServidor, function (value, key) {
                if (value[chave].includes(valor)) {
                    $scope.listaServidorResultado.push(value);
                }
            });
        };

        // ******************************************* métodos de alteração
        $scope.editarServidor = function (servidor) {
            $state.go('editarServidor');
        };

        $scope.novoServidor = function () {
            $state.go('editarServidor');
        };

        // ******************************************* métodos genéricos
        function formatarCPF(cpf) {
            cpf = cpf.replace(/\D/g, "") //remove tudo o que não é dígito
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2") //ponto entre o terceiro e o quarto dígitos
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2") //novamente para o segundo bloco de números
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //hífen entre o terceiro e o quarto dígitos

            return cpf;
        };

        $scope.carregarPagina();

    }]);