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






// AIzaSyBUoFK2LEyLKgRJAnQLAN5NrSs-oZob_BM


}); // end DOM Content Loaded