/**
 * Created by joao victor alves on 24/11/2016.
 */
'use strict';

detranApp.controller("PesquisarAlocacaoController", ['$scope', '$state', '$stateParams', '$uibModal',
    function ($scope, $state, $stateParams, $uibModal) {

        // ------------------------------- variaveis
        var modalInstance;

        $scope.listaAlocacao = [
            {
                cpf: "04698048155",
                cpfFormatado: "046.980.481-55",
                nome: "João Victor Alves",
                unidadeOrigem: "Gerência de Desenvolvimento",
                unidadeDestino: "Diretoria",
                funcao: "Administrador",
                dataAlocacao: "01/01/2015",
                situacao: "1",
                icone: "glyphicon glyphicon-thumbs-up",
                faseAlocacao: "aprovacao"
            },
            {
                cpf: "04604604650",
                cpfFormatado: "046.046.046-50",
                nome: "Helen Moura Jordão",
                unidadeOrigem: "Gerência de Requisitos",
                unidadeDestino: "Presidência",
                funcao: "Contador",
                dataAlocacao: "01/01/2015",
                situacao: "4",
                icone: "glyphicon glyphicon-thumbs-up",
                faseAlocacao: "homologacao"
            },
            {
                cpf: "04698048155",
                cpfFormatado: "046.980.481-55",
                nome: "Luis Armando",
                unidadeOrigem: "Diretoria",
                unidadeDestino: "Gerência de Engenharia",
                funcao: "Administrador",
                dataAlocacao: "01/01/2015",
                situacao: "3",
                icone: "glyphicon glyphicon-thumbs-up",
                faseAlocacao: "chegada"
            },
            {
                cpf: "04604604650",
                cpfFormatado: "046.046.046-50",
                nome: "Lucas Diogo",
                unidadeOrigem: "Gerência de Transporte",
                unidadeDestino: "Almoxarifado",
                funcao: "Estoquista",
                dataAlocacao: "01/01/2015",
                situacao: "4",
                icone: "glyphicon glyphicon-thumbs-up",
                faseAlocacao: "saida"
            },
            {
                cpf: "12345678950",
                cpfFormatado: "123.456.789-50",
                nome: "Fulano Alves",
                unidadeOrigem: "Gerência de Manutenção",
                unidadeDestino: "Gerência de Desenvolvimento",
                funcao: "Analista de Sistemas",
                dataAlocacao: "01/01/2015",
                situacao: "1",
                icone: "glyphicon glyphicon-thumbs-down",
                faseAlocacao: "saida"
            },
            {
                cpf: "78945612350",
                cpfFormatado: "789.456.123-50",
                nome: "Ciclano Alves",
                unidadeOrigem: "Gerência de Teste",
                unidadeDestino: "Oficina",
                funcao: "Copeira",
                dataAlocacao: "01/01/2015",
                situacao: "2",
                icone: "	glyphicon glyphicon-remove-circle",
                faseAlocacao: "chegada"
            },
            {
                cpf: "78945612350",
                cpfFormatado: "789.456.123-50",
                nome: "Beltrano Alves",
                unidadeOrigem: "Gerência de Hardware",
                unidadeDestino: "Contabilidade",
                funcao: "Administrador",
                dataAlocacao: "01/01/2015",
                situacao: "3",
                icone: "glyphicon glyphicon-thumbs-down",
                faseAlocacao: "aprovacao"
            }
        ];

        // ---------------------------------------- funcoes
        $scope.carregarPagina = function () {
            $scope.alocacao = '';
            $scope.pesquisa = '';
            $scope.listaAlocacaoResultado = [];

            if ($stateParams && $stateParams.carregarPesquisa) {
                $scope.listaAlocacaoResultado = $scope.listaAlocacao;
            }
        };

        $scope.listarAlocacao = function () {
            $scope.listaAlocacaoResultado = $scope.listaAlocacao;
        };

        $scope.novaAlocacao = function () {
            $state.go('editarAlocacao');
        };

        $scope.acompanharAlocacao = function (alocacao) {
            $state.go('acompanharAlocacao', {'faseAlocacao': alocacao.faseAlocacao});
        };

        $scope.visualizarHistorico = function () {
            $state.go('visualizarHistorico');
        };

        $scope.anexarDocumento = function () {
            $state.go('anexarDocumento');
        };

        $scope.pesquisarVaga = function () {
            $state.go('pesquisarVaga', {carregarPesquisa: true, carregarBotaoVoltar: true});
        };

        $scope.imprimirAto = function () {
            var popupWindow;

            popupWindow = window.open('', '_blank', 'width=1024,height=768,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWindow.document.open();
            popupWindow.document.write('<html><head>');
            popupWindow.document.write('<link type="text/css" rel="stylesheet" href="css/app.css">');
            popupWindow.document.write('<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css">');
            popupWindow.document.write('<link type="text/css" rel="stylesheet" href="css/print.css">');

            // a linha abaixo remove os href na hora da impressão
            popupWindow.document.write('<style>@media print{a[href]:after{content:none}}</style>');

            popupWindow.document.write('</head><body onload="window.print()">');

            popupWindow.document.write('<div align="center">');
            popupWindow.document.write('<img class="img-rounded" width="150" hspace="100" src="img/detrango.jpg">');
            popupWindow.document.write('<img class="img-rounded" width="150" hspace="100" src="img/logo_goias.png">');
            popupWindow.document.write('</div>');

            // corpo
            popupWindow.document.write($scope.montarAto());

            popupWindow.document.write('</body>');
            popupWindow.document.write('</html>');
            popupWindow.document.close();
        };

        $scope.montarAto = function () {
            var texto = '';

            texto += '<p>&nbsp;</p><p>&nbsp;</p>';
            texto += '<p style="text-align: center;">ALOCAÇÃO DE PESSOAL</p>';

            texto += '<p>&nbsp;</p>';
            texto += '<p style="text-align: justify;">';
            texto += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            texto += 'A Gerência de Gestão de Pessoas, tendo em vista o imperativo de remanejamento ';
            texto += 'de servidor para melhor atender a necessidade de serviço, resolve remanejar a ';
            texto += 'partir de <b>12/12/2016</b> o(a) servidor(a) <b>João Victor Alves Barbosa</b>, ';
            texto += 'CPF <b>046.046.046-50</b>, cargo <b>Analista de Tecnologia da Informação</b>, ';
            texto += 'da <b>Gerência de Segurança da Informação</b> para <b>Gerência de Análise e ';
            texto += 'Desenvolvimento de Sistemas</b>, com carga horária de <b>8(oito)</b> horas diárias.';
            texto += '</p>';

            texto += '<p>&nbsp;</p><p>&nbsp;</p>';
            texto += '<p style="text-align: right;">';
            texto += 'Goiânia, 02 de dezembro de 2016.';
            texto += '</p>';

            texto += '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
            texto += '<p style="text-align: center;">';
            texto += 'ALEXANDRE MAIA GARROTE';
            texto += '<br/>';
            texto += 'Gerente de Gestão de Pessoas';
            texto += '</p>';

            texto += '<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
            texto += '<p style="text-align: center;">';
            texto += 'PAULO SILVA DE JESUS';
            texto += '<br/>';
            texto += 'Diretor de Gestão, Planejamento e Finanças';
            texto += '</p>';

            return texto;
        }

        $scope.abrirHistorico = function (servidor) {

            $scope.listaHistorico = [
                {
                    data: "10/04/2016 14:55",
                    motivo: "Solicitação de Alocação",
                    usuario: "Maria Aparecida",
                    campoAlterado: "Unidade Destino",
                    campoValor: "DETRAN-GTI"
                },
                {
                    data: "01/11/2016 09:50",
                    motivo: "Confirmação da Chegada",
                    usuario: "João Alves",
                    campoAlterado: "Data Chegada",
                    campoValor: "01/11/2016"
                },
                {
                    data: "10/04/2016 14:55",
                    motivo: "Homologação da Alocação",
                    usuario: "Pedro Luis",
                    campoAlterado: "Situação da Alocação",
                    campoValor: "Homologado"
                }
            ];

            modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalHistoricoServidor',
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