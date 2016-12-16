/**
 * Created by iago on 21/06/16.
 */
'use strict';

detranApp.config(['$translateProvider', '$translatePartialLoaderProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', 'growlProvider', 'blockUIConfig', 'RestangularProvider',
    function ($translateProvider, $translatePartialLoaderProvider, $stateProvider, $urlRouterProvider, $httpProvider, growlProvider, blockUIConfig, RestangularProvider) {

        //###################### INICIO DA CONFIGURACAO DO BLOQUEIO DA INTERFACE ######################
        blockUIConfig.message = 'Carregando ...';
        blockUIConfig.delay = 100;
        //###################### FIM DA CONFIGURACAO DO BLOQUEIO DA INTERFACE ######################


        //###################### INICIO DA CONFIGURACAO DAS MENSAGENS ######################
        growlProvider.globalReversedOrder(true);
        growlProvider.globalTimeToLive(-1);
        growlProvider.onlyUniqueMessages(true);
        growlProvider.globalInlineMessages(true);
        //###################### FIM DA DA CONFIGURACAO DAS MENSAGENS ######################


        //###################### INICIO DA DEFINICAO DO PADRAO DE ANGULAR-TRANSLATE ######################
        $translatePartialLoaderProvider.addPart('sgp');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });
        // svd.json precisa estar no diretorio i18n/pt_BR/svd.json
        $translateProvider.preferredLanguage('pt_BR');
        // habilita o escaping do HTML
        $translateProvider.useSanitizeValueStrategy('escape');
        //###################### FINAL DA DEFINICAO DO PADRAO DE ANGULAR-TRANSLATE #######################


        //###################### INICIO DA DEFINICAO DO INTERCEPTOR DE REQUESTS HTTP ##################
        $httpProvider.interceptors.push(function ($q, $injector) {
            return {
                responseError: function (rejection) {

                    var appBody = document.querySelector("#detranapp-controller");

                    if (rejection.status <= 0) {
                        var translation = $injector.get('$translate');
                        angular.element(appBody).scope().showMessageError(translation.instant('MSG.MENSAGEM_M007'));
                        return;
                    }

                    if (rejection.data && rejection.data.ex) {

                        if (rejection.data.codigoErro) {

                            console.log(angular.toJson(rejection.data.ex));
                            angular.element(appBody).scope().showMessageTreatedExcept(rejection.data.ex);
                        } else {

                            angular.element(appBody).scope().showMessageUnhandledExcept(rejection.data);
                        }
                    }

                    console.log('Response received with HTTP error code: ' + rejection.status);
                    return $q.reject(rejection);
                }
            };
        });
        //###################### FIM DA DEFINICAO DO INTERCEPTOR DE REQUESTS HTTP ######################


        //################## INICIO DA CONFIGURAÇÃO DE URL BASE, INTERCEPTOR DE REQUESTS VIA RESTANGULAR ##################

        // TRATAMENTO DE ERRO GENERICO RESTANGULAR
        RestangularProvider.setErrorInterceptor(function(rejection) {

            var appBody = document.querySelector("#detranapp-controller");

            if(rejection.status <= 0) {
                var translation = $injector.get('$translate');
                angular.element(appBody).scope().showMessageError(translation.instant('MSG.MENSAGEM_M007'));
                return;
            }

            if(rejection.data && rejection.data.ex){

                if (rejection.data.codigoErro) {

                    console.log(angular.toJson(rejection.data.ex));
                    angular.element(appBody).scope().showMessageTreatedExcept(rejection.data.ex);

                } else {

                    angular.element(appBody).scope().showMessageUnhandledExcept(rejection.data);
                }
            }

            console.log("Response received with HTTP error code: " + rejection.status);
            return false; // stop the promise chain
        });
        //################## FIM DA CONFIGURAÇÃO DE URL BASE, INTERCEPTOR DE REQUESTS VIA RESTANGULAR ##################

        //###################### INICIO DA CONFIGURAÇÃO DO RESTANGULAR PARA URL BASE E SUFIX ######################
        RestangularProvider.setBaseUrl('/sgp');
        //###################### FINAL DA CONFIGURAÇÃO DO RESTANGULAR PARA URL BASE E SUFIX #######################

    }]);
