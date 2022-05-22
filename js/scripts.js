document.addEventListener("DOMContentLoaded", function () {
	// Ленивая загрузка
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('loaded')) {
				entry.target.src = entry.target.getAttribute('data-src')
				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
})


$(() => {
	// Карусель товаров
	const productsSliders = []

	$('.products .swiper').each(function (i) {
		$(this).addClass('products_s' + i)

		let options = {
			loop: true,
			speed: 500,
			spaceBetween: 24,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						let totalSlides = swiper.slides.length - 2

						$(swiper.$el).find('.count .total').text(totalSlides)
					})
				},
				activeIndexChange: swiper => {
					setTimeout(() => {
						$(swiper.$el).find('.count .current').text((swiper.realIndex + 1))
					})
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Карусель отзывов
	const reviewsSliders = []

	$('.reviews .swiper').each(function (i) {
		$(this).addClass('reviews_s' + i)

		let options = {
			loop: true,
			speed: 500,
			spaceBetween: 24,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			autoHeight: true,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						let totalSlides = swiper.slides.length - 2

						$(swiper.$el).find('.count .total').text(totalSlides)
					})
				},
				activeIndexChange: swiper => {
					setTimeout(() => {
						$(swiper.$el).find('.count .current').text((swiper.realIndex + 1))
					})
				}
			}
		}

		reviewsSliders.push(new Swiper('.reviews_s' + i, options))
	})


	// Таймер
	$('.timer').each(function () {
		let timerDate = $(this).data('date')

		$(this).countdown(timerDate, function (event) {
			// $(this).find('.days').text(event.strftime('%D'))
			$(this).find('.hours').text(event.strftime('%H'))
			$(this).find('.minutes').text(event.strftime('%M'))
			$(this).find('.seconds').text(event.strftime('%S'))
		})
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


    // Плавное появление блока при нажатии на кнопку Подробнее
	$('body').on('click', '.regulation_btn', function (e) {
		e.preventDefault()

		const $box = $(this).closest('.regulation_box'),
			$regul = $(this).closest('.regulation')

		if ($box.hasClass('active')) {
			$box.removeClass('active').find('.regulation_list').slideUp(300)
		} else {
			$regul.find('.regulation_box').removeClass('active')
			$regul.find('.regulation_list').slideUp(300)

			$box.addClass('active').find('.regulation_list').slideDown(300)
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let minimum = parseFloat( input.data('minimum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal > minimum ){
	    	input.val( inputVal-step+unit )
	    }

	    updateCartPrice()
	})

	$('body').on('click', '.amount .plus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let maximum = parseFloat( input.data('maximum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal < maximum ){
	    	input.val( inputVal+step+unit )
	    }

	    updateCartPrice()
	})

	$('.amount .input').keydown(function() {
		let _self = $(this)

		setTimeout(function(){
			if(_self.val() == '' || _self.val() == 0){
				_self.val( parseInt(_self.data('minimum')) )
			}

		    updateCartPrice()
		}, 10)
	})






	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')





	// Fancybox
	/*Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '+',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})*/
})

function updateCartPrice()
{
	let count = Number($(".count_input").val());
	$(".summa span").text(count*3900);
}

var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);  
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {	
    var i;
    var slides = document.getElementsByClassName("meme_info");  
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }   
    slides[slideIndex - 1].style.display = "block";  

    $(".meme .current").text(slideIndex);
	$(".progress-bar-fill").css("width", slideIndex*20+"%")
}