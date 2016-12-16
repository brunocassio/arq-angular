$(function(){
	//Botão de Pesquisar Mobile
	$('#search_mobile').on('click', function(){
		$('header #form_search').slideDown();
	});
	$('header .btn_fechar').on('click', function(){
		$('header #form_search').slideUp();
	});
    //Menu Fixed
    // $('header#fixed a').on('click', function(){
    //     var id = $(this).attr('href');
    //     $('body').animate({
    //         'scrollTop': $(id).offset().top - 49
    //     }, 500);
    //     return false;
    // });
    //Acessibilidade
	// $('.add_invert').on('click', function(){
	// 	if($(this).hasClass('active')){
	// 		$('body').removeClass('invert');
	// 		$(this).removeClass('active');
	// 	}else{
	// 		$('body').addClass('invert');
	// 		$(this).addClass('active');
	// 	}
	// });
	//Enquete
	$('#form_enquete').on('submit', function(){
		var $this = this;
		$($this).parents().find('.step-1').fadeOut(200);
		setTimeout(function(){
			$($this).parents().find('.step-2').fadeIn(200);//.step-3 - Resposta alternativa
		},210);
	});
	//Interna Sidebar
	$('.list_noticias').width($('.mais_noticias').width() * 5);
	$('.list_noticias .noticias').width($('.mais_noticias').width());
	$('.interna aside h2 .dropdown-menu a').on('click', function(){
		if($(this).hasClass('gerais')){
			$('.list_noticias').animate({
				'margin-left': 0
			}, 300);
			$('.interna aside h2').css('background','#d9382b');
		}
		if($(this).hasClass('veiculos')){
			$('.list_noticias').animate({
				'margin-left': -$('.mais_noticias').width()
			}, 300);
			$('.interna aside h2').css('background','#ff7800');
		}
		if($(this).hasClass('vaptvupt')){
			$('.list_noticias').animate({
				'margin-left': -$('.mais_noticias').width() * 2
			}, 300);
			$('.interna aside h2').css('background','#5196ec');
		}
		if($(this).hasClass('habilitacao')){
			$('.list_noticias').animate({
				'margin-left': -$('.mais_noticias').width() * 3
			}, 300);
			$('.interna aside h2').css('background','#07bda4');
		}
		if($(this).hasClass('legislacao')){
			$('.list_noticias').animate({
				'margin-left': -$('.mais_noticias').width() * 4
			}, 300);
			$('.interna aside h2').css('background','#79b816');
		}
	});
	//Etapas
	$('.btn-step2').on('click', function(){
		$('.step.step-1').slideUp(200);
		setTimeout(function(){
			$('.step.step-2').slideDown(200);
			$('.steps .list-step2').addClass('active');
			$('.steps .progress-bar').css('width', '50%');
		}, 200);
	});
	$('.btn-step3').on('click', function(){
		$('.step.step-2').slideUp(200);
		setTimeout(function(){
			$('.step.step-3').slideDown(200);
			$('.steps .list-step3').addClass('active');
			$('.steps .progress-bar').css('width', '84%');
		}, 200);
	});
	//Organiza Notícias na Home Mobile
	if($(window).width() <= 500){
		$('.noticias-3').css('width', $(window).width() * 3);
		$('.noticias-4').css('width', $(window).width() * 4);
		$('.noticias-4').css('width', $(window).width() * 4);
		$('.noticias-scroll a').css('width', $(window).width());
	}
});
$(window).scroll(function(){
	//Menu Fixed
	if($(window).width() > 768){
		if($(window).scrollTop() >= $('section.gerais').offset().top -50){
			$('header#fixed').fadeIn();
			$('header#fixed a').removeClass('ativo');
			$('header#fixed a.gerais').addClass('ativo');
		}else{
			$('header#fixed').fadeOut();
		}
		if($(window).scrollTop() >= $('section.veiculos').offset().top -50){
			$('header#fixed a').removeClass('ativo');
			$('header#fixed a.veiculos').addClass('ativo');
		}
		if($(window).scrollTop() >= $('section.vaptvupt').offset().top -50){
			$('header#fixed a').removeClass('ativo');
			$('header#fixed a.vaptvupt').addClass('ativo');
		}
		if($(window).scrollTop() >= $('section.cnh').offset().top -50){
			$('header#fixed a').removeClass('ativo');
			$('header#fixed a.cnh').addClass('ativo');
		}
		if($(window).scrollTop() >= $('section.legislacao').offset().top -50){
			$('header#fixed a').removeClass('ativo');
			$('header#fixed a.legislacao').addClass('ativo');
		}
	}
});