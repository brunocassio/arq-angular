'use strict';

detranApp.controller('AppController', ['$scope', '$timeout', '$translate', 'growl', '$uibModal', '$sce', '$state',
    function ($scope, $timeout, $translate, growl, $uibModal, $sce, $state) {

        $scope.controllerBodyElement = document.querySelector('body');

        //gerenciamento momentaneo do menu
        $scope.carregarPesquisaServidor = function () {
            $state.go('pesquisarServidor');
        };

        $scope.carregarPesquisaAlocacao = function () {
            $state.go('pesquisarAlocacao');
        };

        $scope.carregarPesquisaVaga = function () {
            $state.go('pesquisarVaga');
        };

        //###################### INICIO FUNCOES GENERICAS PARA MENSAGENS ######################
        $scope.globalMessage = null;
        /**
         * Metodo para mostrar mensagens para o usuario
         *
         * type: success|info|warning|error
         * message: texto do growl
         * title: titulo do growl
         */
        $scope.showMessage = function (type, message, title) {

            $timeout(function () {
                if (growl[type] !== undefined) {
                    $scope.globalMessage = growl[type](message, {
                        'title': title,
                        'referenceId': 1
                    });
                }
            }, 400);
        };

        /**
         * Metodo para mostrar mensagem de obrigatoriedade de campos
         */
        $scope.showMessageObrigatoriedade = function () {
            $scope.limparMensagemTela();
            var message = $translate.instant('VALIDACAO.MENSAGEM_M002');
            if (message && message !== "") {
                $scope.showMessage('error', message);
            } else {
                console.log("texto da mensagem de campos obrigatorios nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de campos invalidos
         */
        $scope.showMessageErrorCampoInvalido = function (campo) {
            $scope.limparMensagemTela();
            var message = campo;
            message += " ".concat($translate.instant('VALIDACAO.MENSAGEM_M004'))
                .concat($translate.instant('VALIDACAO.MENSAGEM_M004_PROCEDIMENTO')).concat(campo)
                .concat($translate.instant('VALIDACAO.MENSAGEM_M004_CAMPOS'));
            if (message && message !== "") {
                $scope.showMessage('error', message);
            } else {
                console.log("texto da mensagem de campos invalidos nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de campos invalidos
         */
        $scope.showMessageError = function (dataError) {
            $scope.limparMensagemTela();
            var message = (dataError) ? dataError : $translate.instant('MSG.MENSAGEM_ERROR');
            if (message && message !== "") {
                $scope.showMessage('error', message);
            } else {
                console.log("texto da mensagem de erros genericos nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de sucesso das operacoes
         */
        $scope.showMessageSucess = function () {
            $scope.limparMensagemTela();
            var message = $translate.instant('MSG.MENSAGEM_M001');
            if (message && message !== "") {
                $scope.showMessage('success', message);
            } else {
                console.log("texto da mensagem de sucesso nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de alerta
         */
        $scope.showMessageAlert = function (dataAlert) {
            console.log(dataAlert);
            $scope.limparMensagemTela();
            var message = angular.copy(dataAlert);
            if (message && message !== "") {
                $scope.showMessage('warning', message);
            } else {
                console.log("texto da mensagem de alerta nao configurado");
            }
        };
        /**
         * Metodo para mostrar mensagem de exception tratada
         */
        $scope.showMessageTreatedExcept = function (exception) {
            $scope.limparMensagemTela();
            growl.error($translate.instant(exception.message) + (exception.msgComplemento ? exception.msgComplemento : ''), {
                title: '',
                referenceId: 1
            });
        };

        /**
         * Metodo para mostrar mensagem de exception nao tratada unhandled
         */
        $scope.showMessageUnhandledExcept = function (exception) {
            $scope.limparMensagemTela();
            var messageException = null;
            if (exception.ex && exception.ex.message) {
                messageException = exception.ex.message;
            } else if (exception.ex && !exception.ex.message && exception.ex.localizedMessage) {
                messageException = exception.ex.localizedMessage;
            }
            growl.error($translate.instant(messageException ? messageException : 'MSG.MENSAGEM_ERROR'), {
                title: '',
//			title: exception.codigoErro ? $translate.instant('CODIGOERRO.'+ exception.codigoErro) : "Erro",
                referenceId: 1
            });
        };

        /**
         * Metodo para remover growl quando presente na tela
         */
        $scope.limparMensagemTela = function () {
            if ($scope.globalMessage) {
                $scope.globalMessage.destroy();
            }
        };
        //###################### FIM FUNCOES GENERICAS PARA MENSAGENS ######################


        //###################### INICIO FUNCOES DE CONTROLE DAS MODAIS DE HELP ######################
        /**
         * Metodo para abrir modal com help da pagina
         */
        var LIMITFIELDHELP = 50;
        $scope.openModalHelp = function (helpPageContentKey) {

            if (helpPageContentKey) {

                var camposPrincipais = [];
                for (var i = 1; i <= LIMITFIELDHELP; i++) {
                    // nomeCampo e descricaoCampo sao obrigatorios, toda pagina de help terá, ao contrario do importanteCampo
                    var nomeCampo = $translate.instant(helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.NOME_CAMPO_').concat(i.toString()));
                    var descricaoCampo = $translate.instant(helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.DESCRICAO_CAMPO_').concat(i.toString()));
                    var importanteCampo = $translate.instant(helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.IMPORTANTE_CAMPO_').concat(i.toString()));

                    if ((nomeCampo !== helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.NOME_CAMPO_').concat(i.toString())
                        || descricaoCampo !== helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.DESCRICAO_CAMPO_').concat(i.toString()))
                        && (nomeCampo && nomeCampo !== '' && descricaoCampo && descricaoCampo !== '')) {

                        if (importanteCampo === helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.IMPORTANTE_CAMPO_').concat(i.toString())) {
                            camposPrincipais.push({nome: nomeCampo, descricao: descricaoCampo});
                        } else {
                            camposPrincipais.push({
                                nome: nomeCampo,
                                descricao: descricaoCampo,
                                importante: importanteCampo
                            });
                        }

                    } else {
                        break;
                    }
                }

                var settings = {
                    title: $translate.instant('LABEL.HELP_ONLINE'),
                    funcionalidade: $translate.instant(helpPageContentKey.concat('.FUNCIONALIDADE')),
                    objetivo: $translate.instant(helpPageContentKey.concat('.OBJETIVO')),
                    camposPrincipais: camposPrincipais,
                    paragrafoPadraoOne: $translate.instant('HELP.PARAGRAFO_PADRAO_1'),
                    paragrafoPadraoTwo: $translate.instant('HELP.PARAGRAFO_PADRAO_2'),
                    item: {},
                    items: [],
                    callback: function () {
                    }
                };

                this.modalHelpInfo = settings;

                this.modalHelpInstace = $uibModal.open({
                    animation: true,
                    templateUrl: 'modalHelpTemplate',
                    size: 'lg',
                    scope: this
                });
            }
        };
        //###################### FIM FUNCOES DE CONTROLE DAS MODAIS DE HELP ######################

        $scope.getSanitizeHtml = function (content, isTranslate) {

            if (isTranslate) {
                return $sce.trustAsHtml($translate.instant(content));
            }

            return $sce.trustAsHtml(content);
        };
    }]);