document.addEventListener('DOMContentLoaded', function () {

    console.log(19);

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

});