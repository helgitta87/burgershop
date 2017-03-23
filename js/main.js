//one page scroll
$(function () {
	var
		sections = $('.section'),
		display = $('.maincontent'),
		screen = 0,
		inscroll = false;

	sections.filter(':first-child').addClass('active');

	var scrollToSection = function (sectionEq) {
		var position = 0;

		if (!inscroll) {
			inscroll = true;
			position = (sections.eq(sectionEq).index() * -100) + '%';
			sections.eq(sectionEq).addClass('active')
				.siblings().removeClass('active');

			display.css({
				'transform' :  'translate3d(0,' + position + ', 0)'
			});

			setTimeout(function () {
				inscroll = false;

				$('.fixed-menu__item').eq(sectionEq).addClass('active')
					.siblings().removeClass('active');
			}, 1300)
		}
	}

	document.querySelector('.wrapper')
		.addEventListener('wheel', function (e) {

			var activeSection = sections.filter('.active');

			if (!inscroll) {

				if (e.deltaY > 0) { //скроллим вниз
					if (activeSection.next().length) {
						screen = activeSection.next().index();
					}
				}

				if (e.deltaY < 0) { //спроллим вверх
					if (activeSection.prev().length) {
						screen = activeSection.prev().index()
					}
				}

				scrollToSection(screen);
			}
		});

	$('.down-arrow').on('click', function(e){
	    e.preventDefault();

		scrollToSection(1);
	});

	$('.nav__link, .fixed-menu__link, .btn-order_slider, .btn-order_header')
		.on('click', function(e){
		    e.preventDefault();

		    scrollToSection(parseInt($(this).attr('href')));
		});
});


//slider
$(function () {
    
    var burgerCarousel = $('.burger-slider').owlCarousel({
        
        items : 1,
        loop: true,   
    });
    
    $('.slider__btn_right').click(function(e) {
        
        e.preventDefault();
        burgerCarousel.trigger('next.owl.carousel', [400]);
        
    });
    
    $('.slider__btn_left').click(function(e) {
        
        e.preventDefault();
        burgerCarousel.trigger('prev.owl.carousel', [400]);      
    });      
});


//vertical accordion
$(function () {
	$('.team-acco__link').on('click', function(e){
	    e.preventDefault();
	    
	    var $this = $(this),
		    item = $this.closest('.team-acco__item'),
		    container = $this.closest('.team-acco'),
		    items = container.find('.team-acco__item'),
		    content = item.find('.team-acco__content'),
		    otherContent = container.find('.team-acco__content');
		
		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			otherContent.slideUp();
			content.slideDown();
		} else {
			item.removeClass('active');
			content.slideUp();
		}
	});
});


//horizontal accordion
$(function(){
	$('.acco-menu__link').on('click', function(e){
	    e.preventDefault();

		var $this = $(this),
			container = $this.closest('.acco-menu'),
			item = $this.closest('.acco-menu__item'),
			items = container.find('.acco-menu__item'),
			activeItem = items.filter('.active'),
			content = item.find('.acco-menu__desc'),
			activeContent = activeItem.find('.acco-menu__desc');

		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			activeContent.animate({
				'width' : '0px'
			});

			content.animate({
				'width' : '550px'
			});
		} else {
			item.removeClass('active');
			content.animate({
				'width' : '0px'
			});
		}
	});

	// клик вне аккордеона
	$(document).on('click', function (e) {
		var $this = $(e.target);

		if (!$this.closest('.acco-menu').length) {
			$('.acco-menu__desc').animate({
				'width' : '0px'
			});

			$('.acco-menu__item').removeClass('active');
		}
	});
});

//input mask
$(function(){
	$('.phone-mask').inputmask('+7 (999) 999 99 99');
});

//fancybox
$(function () {
	$('.client__more-btn').fancybox({
		type: 'inline',
		maxWidth : 460,
		fitToView : false,
		padding : 0
	});

	$('.reviews-popup__close').on('click', function(e){
	    e.preventDefault();
		$.fancybox.close();
	});
});

//map
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        }),
        
        coords = [[55.74198793, 37.62707125], [55.75980205, 37.64011744], [55.75912449, 37.60681574]],
        
        myPlacemark = new ymaps.GeoObjectCollection ({}, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/icon/map-marker.svg',
            // Размеры метки.
            iconImageSize: [40, 50],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });
    
    for (var i = 0; i < coords.length; i++) {
        myPlacemark.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myPlacemark);
});


//ajax
$(function(){
    $('#order-form').on('submit', function(e){
        e.preventDefault();

	    var
		    form = $(this),
		    formData = form.serialize();

		$.ajax({
            url: '../php/mail.php',
            type: 'POST',
            data: formData,
            success: function(data) {
                
                var popup = data.status ? '#success' : '#error';
			
                $.fancybox.open([
				    { href: popup }
			     ], {
				    type: 'inline',
				    maxWidth : 250,
				    fitToView : false,
				    padding : 0,
                    afterClose: function () {
                        form.trigger('reset');
                    }
                });
            }
			
        });
		
    });
    
    $('.form-popup__close').on('click', function(e){
        e.preventDefault();
        
        $.fancybox.close();
        
    });
    
});
	

