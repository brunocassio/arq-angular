"use strict";

detranApp.directive('labelInputDataHour', ['$translate', '$filter', function($translate, $filter) {

    return {
        require: ['^ngModel'],
        scope: {
            id: "@ngId",
            label: "@ngLabel",
            obrigatorio: "=ngObrigatorio",
            disabled: "=ngDisabled",
            model: "=ngModel",
            eventoChange: "&ngEventoChange",
            form: "=form",
            labelAlertTooltip: '@',
            labelInfoTooltip: '@',
            labelQuestionTooltip: '@',
            mode: "@ngMode"
        },
        replace: true,
        restrict: 'E',
        templateUrl: '/sgp/js/custom/directive/html/labelInputDataHour.html',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            if($scope.id === undefined){
                $scope.id = $attrs['ngModel'];
            }

            $scope.datePickerFormat = $scope.format ? $scope.format : 'HH:mm:ss';
            
            // Não renderiza <label> caso nao foi definido 'label'
            $scope.labelRender = true;
            if($scope.label === undefined) {
                $scope.labelRender = false;
            }

            // Define um 'labelAlertTooltip' caso não tenha definido um
            $scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;
            if($scope.labelAlertTooltip === undefined && $scope.obrigatorio === true) {
                // TODO retirar este copy e verificar pq não esta funcionando
                $scope.labelAlertTooltipCopy = $translate.instant($scope.label) + ' ' + $translate.instant('LABEL.CAMPO_OBRIGATORIO');
            }

            // Não renderiza o icone de tooltip de informação
            $scope.labelInfoTooltipRender = true;
            if($scope.labelInfoTooltip === undefined) {
                $scope.labelInfoTooltipRender = false;
            }

            // Não renderiza o icone de tooltip de dúvida
            $scope.labelQuestionTooltipRender = true;
            if($scope.labelQuestionTooltip === undefined) {
                $scope.labelQuestionTooltipRender = false;
            }
            
        }],
        link: function ($scope) {

            $scope.dataInvalida = false;

            $scope.$on('limpar', function (e, data) {
                $scope.dataInvalida = data;
            });

            var formataDataInput = function (data) {

                if(data && data !== ""){
                    var fn = null;
                    if(data.length === 8){
                        if (!validaHoras(data) || $scope.form[$scope.id].$error.date){
                            fn = false;
                        } else {
                            fn = true;
                        }
                        //Envia alerta de data inválida
                        var portal = document.querySelector("#detran-portal-app-controller");

                        if(!fn) {
                            $scope.model = '';
                            $scope.eventoChange();
                            $scope.dataInvalida = true;

                            angular.element($scope.$parent.controllerBodyElement).scope().showMessageErrorCampoInvalido($translate.instant($scope.label));
                        } else {
                            angular.element($scope.$parent.controllerBodyElement).scope().limparMensagemTela();
                            $scope.dataInvalida = false;
                        }
                    } else {
                        $scope.model = '';
                    }
                }
            };

            $scope.formataDataAoDigitar = function ($e) {

                var value = $e.currentTarget.value;
                var key = ($e.keyCode ? $e.keyCode : $e.which);

                if(key === 46){
                    return;
                }

                // VERIFICA SE E NUMERICO
                if ((key >= 96 && key <= 105) || (key >= 48 && key <= 57)) {
                    $e.currentTarget.value = removeLetras(value);

                    if($e.currentTarget.value.length > $scope.datePickerFormat.length) {
                        $e.currentTarget.value = value.substring(0, value.length - 1);
                    } else {
                        if($scope.datePickerFormat === 'mm:ss'){
                            if(value.length === 2) {
                                value = value.replace(/([0-9]{2})/, '$1:');
                            } 
                        }else{
                            if(value.length === 2) {
                                value = value.replace(/([0-9]{2})/, '$1:');
                            }

                            if(value.length === 5) {
                                value = value.replace(/([0-9:]{5})/, '$1:');
                            }

                            $e.currentTarget.value = value;
                            if(value.length === 8){
                                formataDataInput(value);
                            }
                        }
                    }
                } else if(key === 111 && $e.type === 'keydown') {
                    $e.currentTarget.value = value.substring(0, value.length - 1);
                } else {
                    $e.currentTarget.value = removeLetras(value);
                }

            };

            // remover letras do campo que possam estar sendo digitadas no momento
            var removeLetras = function (value) {
                return value.replace(/[^0-9\:]/g, '');
            };

            // limpa o campo de tada 
            $scope.limparModel = function() {
                if(!$scope.disabled){
                    $scope.model = '';
                    $scope.eventoChange();
                    $scope.dataInvalida = false;
                }
            };

            $scope.formataDataAoDesfocar = function ($e) {
                formataDataInput($e.currentTarget.value);
            };
        }
    };
}]);