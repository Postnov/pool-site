var mapContainer = document.querySelector('#contact-map') || false;

if (mapContainer) {
    ymaps.ready(init);

    function init() {
        var contactsMap = new ymaps.Map('contact-map', {
            center: [45.035515, 39.061147],
            zoom: 13,
            controls: []
        });

        // contactsMap.controls.add('zoomControl');

        var point = new ymaps.Placemark([45.035515, 39.061147], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../images/logo-img.png',
            iconImageSize: [72, 60],
            iconImageOffset: [-4, -79]
        });

        contactsMap.geoObjects.add(point);
        // contactsMap.behaviors.disable('scrollZoom');
        // contactsMap.behaviors.disable('drag');


        // Создадим пользовательский макет ползунка масштаба.
        ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
                "<div id='zoom-in' class='btn'>123123<i class='icon-plus'></i></div><br>" +
                "<div id='zoom-out' class='btn'><i class='icon-minus'></i></div>" +
            "</div>", {

                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    $('#zoom-in').bind('click', this.zoomInCallback);
                    $('#zoom-out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $('#zoom-in').unbind('click', this.zoomInCallback);
                    $('#zoom-out').unbind('click', this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
                },

                zoomOut: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
                }
            }),
            zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });

        contactsMap.controls.add(zoomControl);
    }
}




document.addEventListener('DOMContentLoaded', function () {

    // Первый параметр - массив классов, высоту которых надо вычитать. Второй - селектор элемента, которому нужно устанавливать минимальную высоту

    pageSetMinHieght(['.header', '.footer'], '.page__content');

    function pageSetMinHieght(classesArray, selectorContent) {
        var commonHeight = 0,
            deviceHeight = window.innerHeight,
            totalHeight = 0;

        classesArray.forEach(function (item) {
            var elem = document.querySelector(item);

            if (elem) {
                var height = elem.scrollHeight || 0;
                commonHeight += height;
            }
        });

        totalHeight = deviceHeight - commonHeight;

        document.querySelector(selectorContent).style.minHeight = totalHeight + 'px';
    }

    $('.js-input-tel').keyup(function (event) {
        mask(event, '.js-input-tel');
    });

    // Анимация label при фокусе и потере фокуса в инпутах
    ;['focusin', 'focusout'].forEach(function (eventName, i) {
        $('.js-contact-field').on(eventName, function () {

            var placeholder = $(this).closest('.field-item').find('.js-contact-field-label'),
                input = $(this);

            if (input.hasClass('js-input-tel')) {
                if (input.val().length == 0) {
                    setTimeout(() => {
                        input.val('+7 ');
                    }, 100);
                }

                if (input.val().length < 17 && input.val().length > 1) {
                    input.val('');
                }
            }

            if (placeholder.hasClass('active') && input.val().length === 0) {
                placeholder.removeClass('active');
            } else if (!placeholder.hasClass('active')) {
                placeholder.addClass('active');
            }
        });
    });



    animationDinamic();

    //Tabs
    $('.js-tab-trigger').click(function () {
        var id = $(this).attr('data-tab'),
            content = $('.js-tab-content[data-tab="' + id + '"]');

        $('.js-tab-trigger.active').removeClass('active');
        $(this).addClass('active');

        $('.js-tab-content.active').removeClass('active');
        content.addClass('active');

        animationDinamic();

    });



    function animationDinamic() {
        if ($('.js-tab-content').length) {

            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ' ',
                decimal: '.',
                suffix: ' '
            };

            var incrementValue = document.querySelector('.js-tab-content.active .js-increment').getAttribute('data-number');

            incrementValue = +incrementValue.replace(/\s/g, '');

            var demo = new CountUp('.js-tab-content.active .js-increment', 0, +incrementValue, 0, 1, options);

            if (!demo.error) demo.start();
            else console.error(demo.error);

            var progressBars = $('.js-tab-content.active .js-dinamic-animation'),
                progressValues = $('.js-tab-content.active .js-dinamic-value'),
                values = [];

            // Заменяем пробелы в показателях для получения типа: число
            values[0] = $(progressValues[0]).text().replace(/\s/g, '');
            values[1] = $(progressValues[1]).text().replace(/\s/g, '');

            // Деление второго показателя на первый для получения процентов
            var percent = values[1] / values[0] * 100;

            // Может получиться 150% и линия вылезет за границу блока, этим мы ограничиваем возможное значение
            if (percent > 100) percent = 100;

            // Удаляем активный класс для сброса значений, если не удалить класс долгая анимация не даст сбросить значение
            // 25% потому что текста налезают друг на друга
            $(progressBars[0]).removeClass('active').css('width', '25%');
            $(progressBars[1]).removeClass('active').css('width', '25%');

            // Первое значение всегда 100% так как максимальное, второе по проценту от первого значения
            $(progressBars[0]).addClass('active').css('width', '100%');
            $(progressBars[1]).addClass('active').css('width', percent + '%');

        }
    }








    //Detail sliders

    $('.js-detail-nav-slider').slick({
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        asNavFor: '.js-detail-main-slider',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                    vertical: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    vertical: false
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    vertical: false
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    vertical: false
                }
            },
          ]

    })

    $('.js-detail-main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        infinite: false,
        asNavFor: '.js-detail-nav-slider'
    });


    $('.js-reviews-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        infinite: false,
        // variableWidth: true,
        arrows: false,
        responsive: [
            {
              breakpoint: 1050,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }
          ]
    });


    //navigation

    $(document).on('click', '.js-nav-toggle', function(e) {
        e.preventDefault();

        $('.nav').toggleClass('active');
        $('body').toggleClass('no-scroll')

        console.log($('.nav').hasClass('active'));


        if ($('.nav').hasClass('active')) {
            $('.nav__link').each(function(i, item) {
                (function(i) {
                    setTimeout(function() {
                        $(item).addClass('is-active');
                    },i * 200)
                })(i)

            });
        }else {
            $('.nav__link').removeClass('is-active');
        }
    });

    //fixed panel for scrolling

    var fixedTop = $('.header').clone();
    fixedTop.addClass('header--fixed');

    if($(window).width() <= 768) {
        fixedTop.find('.nav').remove();
    }

    $('.header').before(fixedTop);

    $(window).scroll(function() {
        if ( $(window).scrollTop() > 150) {
            fixedTop.addClass('active');
        } else {
            fixedTop.removeClass('active');
        }
    });


}); // end DOM Content Loaded