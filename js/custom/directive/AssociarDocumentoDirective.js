/**
 * Created by iago on 02/09/2016.
 */
'use strict';

detranApp.directive('associarDocumentoUpload', ['$translate', function ($translate){
    return {
        scope : {
            documento : '=ngDocumento',
            onDeleteDocumento : '&ngOnDeleteDocumento',
            onErrorItem : '&ngOnErrorItem',
            onSuccessItem : '&ngOnSuccessItem',
            onDownloadItem : '&ngOnDownloadItem',
            onVisualizarAvaliacaoItem : '&ngOnVisualizarAvaliacaoItem'
        },
        replace : true,
        restrict : 'E',
        templateUrl : 'js/custom/directive/html/associarDocumento.html',
        controller: ['$scope', function($scope) {

            // --------------------------------------------- INICIO CONTROLE UPLOADER ----------------------------------------------------

            if(!$scope.documento){
                console.log('Esta directiva não funcionará se esse valor não for atribuido!');
            }

            //NECESSARIO PARA QUE A BIBLIOTECA DE FILEUPLOAD POSSA FUNCIONAR
            if(!$scope.documento.arquivo) {
                console.log('Esta directiva não funcionará se esse valor não for atribuido! Ele deve ser do tipo FileUploader');
            }

            //NECESSARIO PARA IDENTIFICAR O DOCUMENTO NO MOMENTO DA EXCLUSAO
            if (!$scope.documento.idTipoDocumento) {
                console.log('Esta directiva não funcionará se esse valor não for atribuido! Ele deve ser um numero');
            }

            //NECESSARIO PARA QUE O DOCUMENTO POSSA SER BAIXADO APOS O UPLOAD
            if ($scope.documento && $scope.documento.uploaded && !$scope.documento.idDocFlow) {
                console.log('Esta directiva não funcionará se esse valor não for atribuido! Ele deve ser um numero');
            }

            if($scope.documento && $scope.documento.uploaded && $scope.documento.arquivo && $scope.documento.arquivo.queue){

                $scope.documento.arquivo.queue.push({
                    file: {
                        name: 'arquivo'
                    },
                    isUploaded: true,
                    isSuccess: true
                });
            }
            // --------------------------------------------- FIM CONTROLE UPLOADER -----------------------------------------------------
        }],

        link : function($scope){

            //FUNCAO PARA ADICIONAR O DOCUMENTO
            $scope.acionarInputFile = function (idTipoDocumento){
                document.getElementById("inputFileDocumento_" + idTipoDocumento.toString()).click();
            };

            //FUNCAO PARA REMOVER O DOCUMENTO
            $scope.removeQueue = function () {
                if ($scope.onDeleteDocumento){
                    $scope.onDeleteDocumento({documento : $scope.documento}).then(function () {
                        $scope.documento.arquivo.queue.splice(0, 1);
                        $scope.documento.uploaded = false;
                        $scope.documento.idDocFlow = null;
                        $scope.$parent.showMessage('sucess', $translate.instant('MSG.SUCESSO_REMOVER_DOCUMENTO'));
                    }, function errorCallBack(error) {
                        console.error(angular.toJSON(error));
                    })
                }
            };

            //FUNCAO PARA FAZER O DOWNLOAD DO DOCUMENTO
            $scope.onDownload = function (idDocFlow){
                if ($scope.onDownloadItem && idDocFlow){
                    $scope.onDownloadItem({idDocFlow : idDocFlow});
                }
            };

            //FUNCAO PARA VISUALIZAR AVALIACAO DO DOCUMENTO
            $scope.onVisualizarAvaliacao = function (documento) {
                if($scope.onVisualizarAvaliacaoItem && documento){
                    $scope.onVisualizarAvaliacaoItem({documento : documento});
                }
            };

            $scope.documento.arquivo.onWhenAddingFileFailed = function(item, filter, options) {
                angular.element($scope.$parent.controllerBodyElement).scope().showMessageError('MSG.SELECIONE_ARQUIVO_PDF_TAMANHO_MAXIMO');
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            $scope.documento.arquivo.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            $scope.documento.arquivo.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            $scope.documento.arquivo.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
            };
            $scope.documento.arquivo.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            $scope.documento.arquivo.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            $scope.documento.arquivo.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
                // if ($scope.onSuccessItem){
                //     $scope.onSuccessItem({response : response})
                // }
            };
            $scope.documento.arquivo.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
                angular.element($scope.$parent.controllerBodyElement).scope().showMessageError($translate.instant('MSG.ERRO_SALVAR_DOCUMENTO'));
                fileItem.remove();
            };
            $scope.documento.arquivo.onCancelItem = function(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            $scope.documento.arquivo.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
                if (response && response[0] && response[0].idDocumento){
                    $scope.documento.uploaded = true;
                    $scope.documento.idDocFlow = response[0].idDocumento;
                    $scope.$parent.limparMensagemTela();
                }
            };
            $scope.documento.arquivo.onCompleteAll = function() {
                console.info('onCompleteAll');
            };

            //TODO REMOVER CONSOLES ANTES DE ENTRAR EM PRODUCAO
            console.info('uploader', $scope.documento.arquivo);
            console.info('ID_TIPO_DOCUMENTO', $scope.documento.idTipoDocumento);
        }
    };
}]);