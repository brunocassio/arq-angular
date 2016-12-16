/**
 * Created by iago on 02/09/2016.
 * * No Controller:
 *   $scope.uploader = new FileUploader({
        autoUpload: false,
        queueLimit: 1,
        url : '/cit-tabelas-corp-web/rest/anexo/uploadAnexo?idDocumento='
    });
 *
 * No html:
 * <componente-associar-documentos ng-documentos="entrada.documentos" ng-edit="edit" ng-uploader="uploader" ng-workspace="$parent.workspace" form="documentosEntradaForm" ng-obrigatorio="true"></componente-associar-documentos>
 */
detranApp.directive("componenteAssociarDocumentos", ["$translate",
                                                  "FileUploader",
                                                  "DominioRepository",
                                                  "ParceiroRepository",
                                                  "DocumentoRepository",
                                                  "$modal",
                                                  "$filter",
                                                  "$timeout",
                                                  "AnexoRepository",
                                                  "EstruturaOrganizacionalRepository",
                                                  function($translate,
                                                		  FileUploader,
                                                		  DominioRepository,
                                                		  ParceiroRepository,
                                                		  DocumentoRepository,
                                                		  $modal,
                                                		  $filter,
                                                		  $timeout,
                                                		  AnexoRepository,
                                                		  EstruturaOrganizacionalRepository) {
	return {
		scope : {
			documentos : "=ngDocumentos",
			edit : "=ngEdit",
			form : "=form",
			uploader : "=ngUploader",
			workspace : "=ngWorkspace",
			obrigatorio : "=ngObrigatorio",
			labelAlertTooltip: '@'
		},
		replace : true,
		restrict : "E",
		templateUrl : '/cit-tabelas-corp-web/assets/js/angular/custom/directive/html/associarDocumentos.html',
		controller : ['$scope', function($scope){
			$scope.appController = angular.element("#citapp-controller").scope();

			// Define um 'labelAlertTooltip' caso n�o tenha definido um
			$scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;
			if($scope.labelAlertTooltip === undefined) {
				$scope.labelAlertTooltipCopy = $translate.instant('CORPORATIVO.LABEL.ASSOCIAR_DOCUMENTOS') + ' ' + $translate.instant('LABEL.CAMPO_OBRIGATORIO');
			}

			$scope.tipoEmissor = 1;
			
			$scope.radioValueList = [{
				codigo : 1,
				descricao : $translate.instant('LABEL.UNIDADE')
			}, {
				codigo : 2,
				descricao : $translate.instant('LABEL.ORGAO_EXTERNO')
			}];

		}],
		link : function($scope, $element, attributes) {

			$scope.openModal = function (modalId, size) {
				if(modalId === undefined) {
					return;
				}

				$scope.$modalInstance = $modal.open({
					templateUrl: modalId,
					size: size,
					windowClass: 'modal-buttons-top modal-no-backdrop',
					backdrop: false,
					scope: this
				});
			};

			$scope.inicializarModalDocumentos = function(){
				$scope.editDocumento = true;
				$scope.documento = {
					anexos : [],
					$uuid : getUuid()
				};
				if($scope.uploader.queue && $scope.uploader.queue.length > 0){
					$scope.uploader.queue.splice($scope.uploader.queue[0], 1);
				}
				$scope.openModal('modal-documentos.html', 'md');
			};

		     $scope.uploader.onCompleteAll = function() {
		    	 $scope.uploader.clearQueue();
		         console.info('onCompleteAll');
		     };

		     $scope.salvarAdicionarDocumento = function(formDialogDocumentos){
		    	var hoje = new Date();
		    	formDialogDocumentos.$submitted = true;
		 		if(formDialogDocumentos.$valid && !($scope.documento.dataEmissao.getTime() > hoje)){
		 			$scope.documento.uploadsDocumento = $scope.uploader.getNotUploadedItems();

		 			if ($scope.documentos == undefined || $scope.documentos == null) {
		 				$scope.documentos = [];
		 			}
		 			$scope.dominiosTipoDocumento.forEach(function (tipoDocumento, key) {
		 				if($scope.documento.dominioTipoDocumento.id === tipoDocumento.id){
		 					$scope.documento.dominioTipoDocumento = tipoDocumento.originalElement;
		 				}
		 			});
		 			$scope.documentos.forEach(function (documento, key) {
						if(documento.$uuid && $scope.documento.$uuid && documento.$uuid === $scope.documento.$uuid ||  documento.id && $scope.documento.id && documento.id === $scope.documento.id ){
				 			$scope.documentos.splice(key, 1);
						}
					});
		 			$scope.documentos.push($scope.documento);
		 			$scope.$modalInstance.dismiss('cancel');
		 		} else if(formDialogDocumentos.$valid && ($scope.documento.dataEmissao.getTime() > hoje)){

		 			$scope.$parent.showAlert('error', $translate.instant('CORPORATIVO.VALIDACAO.CPF_OBRIGATORIO_REPRESENTANTE_LEGAL'));
		 		}else if(formDialogDocumentos.$invalid){

		 			$scope.$parent.showAlert('error', $translate.instant('VALIDACAO.ALERTA_OBRIGATORIOS'));
		 		}
		 	};

		 	$scope.removerDocumento = function(){

		 		var documento = $scope.getDocumentoChecked();

		 		if(documento !== undefined){

		 			$scope.appController.$openModalConfirm({message: $translate.instant('MSG.DESEJA_EXCLUIR_ITENS'), callback: $scope.excluir, item: documento});
		 		} else {
		 			$scope.appController.showAlert('warning', $translate.instant('MSG.SELECIONE_ITEM_EXCLUIR'));
		 		}
		 	};

		 	$scope.excluir = function(){
		 		var documento = this.item;
		 		if(documento.id !== undefined) {
					DocumentoRepository.remove(documento);
					$scope.appController.showAlertSucesso("success", $translate.instant('MSG.REGISTRO_EXCLUIDO'));
				}
		 		$scope.documentos.splice(documento.$index, 1);
		 		$scope.appController.$modalConfirmInstance.dismiss('cancel');
		 	};

		 	$scope.visualizarDocumento = function(edit){

		 		var documento = angular.copy($scope.getDocumentoChecked());

		 		if(documento !== undefined){

		 			$scope.editDocumento = edit;
		 			$scope.documento = documento;
		 			$scope.documento.dataEmissao = $filter('date')(documento.dataEmissao, "dd/MM/yyyy");
		 			if($scope.documento.id && $scope.documento.emitente){
		 				$scope.documento.emitente['pessoa.nome'] = $scope.documento.emitente.pessoa.nome;
		 			}

		 			if(documento.uploadsDocumento){
		 				$scope.uploader.queue = documento.uploadsDocumento;
		 			} else if($scope.uploader.queue) {
		 				$scope.uploader.queue.splice($scope.uploader.queue[0], 1);
		 			}

		 			$scope.openModal('modal-documentos.html', 'md');

		 		} else {
		 			if(edit) {
		 				$scope.appController.showAlert('warning', $translate.instant('MSG.SELECIONE_UM_ITEM_PARA_EDICAO'));
		 			} else {
		 				$scope.appController.showAlert('warning', $translate.instant('MSG.SELECIONE_UM_ITEM_PARA_VISUALIZACAO'));
		 			}
		 		}

		 	};

			DominioRepository.findAllDominio('tipoDocumento').then(function(result) {
				$scope.dominiosTipoDocumento = result;
			});

			$scope.findEmissorParceiros = function(value){
				return ParceiroRepository.findParceiros('tipoParceiro', ['FORNECEDOR', 'ORGAO_EXTERNO', 'PORTADOR'] , value).then(function(result) {
					return result;
				});
			};
			
			$scope.findEmissorOrgaoExterno = function(value){
				return ParceiroRepository.findParceiros('tipoParceiro', ['ORGAO_EXTERNO'] , value).then(function(result) {
					return result;
				});
			};

			$scope.findEstruturaOrganizacional = function(value) {
				return EstruturaOrganizacionalRepository.listarEstruturasOrganizacionaisBuscaSimples(value).then(function(result){
					return result;
				});
			};

			$scope.documentosIsEmpty = function() {
				return ($scope.documentos == undefined || $scope.documentos == null || $scope.documentos.length == 0);
			};

			$scope.checkDocumento = function(documento){
				$scope.removeDocumento();
				documento.$checked = true;
			};

			$scope.removeDocumento = function () {
				$scope.documentos.forEach(function (documento) {
					documento.$checked = false;
				});
			};

			$scope.getDocumentoChecked = function () {
				var documentoChecked = undefined;
				$scope.documentos.forEach(function (documento) {
					if(documento.$checked) {
						documentoChecked = documento;
					}
				});

				return documentoChecked;
			};

			$scope.removerAnexo = function(anexo){

				if(anexo && anexo.id){

					$scope.appController.$openModalConfirm({message: $translate.instant('MSG.DESEJA_EXCLUIR_ITENS'), callback: $scope.excluirAnexo, item: anexo});
				}
			};

		 	$scope.excluirAnexo = function(){
		 		var anexo = this.item;
		 		if(anexo.id) {
		 			AnexoRepository.remove(anexo);
		 			$scope.documento.anexos.forEach(function (entity, key) {
		 				if(entity.id === anexo.id){
		 					$scope.documento.anexos.splice(key, 1);
		 				}
		 			});
					$scope.appController.showAlertSucesso("success", $translate.instant('MSG.REGISTRO_EXCLUIDO'));
					$scope.appController.$modalConfirmInstance.dismiss('cancel');
				}
		 	};

		 	$scope.visualizarImagem = function(documentoAnexo){

		 		if (!documentoAnexo.id) {
					$scope.showAlert('warning', $translate.instant('MSG.SELECIONE_UM_ITEM_PARA_VISUALIZACAO'));
					return;
				}

				$scope.url = '/cit-tabelas-corp-web/rest/anexo/visualizarImagem?idAnexo=' + documentoAnexo.id;

				$scope.openModal('visualizarArquivos', 'lg');

		 	};

		 	$scope.selecionaTipoEmissor = function(tipoEmissorSelected) {
		 		$scope.tipoEmissor = tipoEmissorSelected;
		 	};
		}
	};
}]);

