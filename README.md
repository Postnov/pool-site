# template-project

Шаблон проекта. <br>

После скачивания или клонирования в командой строке необходимо установить все пакеты, выполните <code>npm i</code> <br>
Возможно некоторые пакеты придется установить вручную. 

<code>1.  pug:comb</code>          -  компилирует в html,"причесывает"<br>
<code>2.  css:polish</code>      -  компилирует в css, расставляет префиксы, "причесывает", минифицирует<br>
<code>3.  js:min</code>            -  конкатеринует файлы, минифицирует<br>
<code>4.  gulp css:build</code>    -  компиляция scss<br>
<code>5.  gulp js:build</code>     -  сборка js<br>
<code>6.  gulp pug:build</code>    -  компиляция pug<br>
<code>7.  gulp fonts:build</code>  -  переносит папку src/fonts в dist/fonts <br>
<code>8.  gulp images:build</code> -  переносит папку src/images в dist/images <br>
<code>8.  gulp images:optimize</code> -  сжимает изображения и переносит в dist/images <br>
<code>9.  gulp build</code>        -  выполняет таск по сборке проекта (выполняет все такски по компиляции, конкатенации и переносу) <br>
<code>10. gulp watch</code>        -  выполняет таски при изменении файлов, если вы загрузите новые изображения в папку img, watch запустит images:build<br>
<code>11. gulp webserver</code>    -  запуск сервера <br>
<code>12. gulp clean</code>        -  удаление папки dist <br>
<code>13. gulp</code>              -  default таск для запуска всех таксков <br>


Все пути находятся в объекте <code>path</code> в файле <code>gulpfile.js</code> <br>

Все подключаемые части расположены в папках <code>partails/</code><br>
Подключение файлов:
- scss - <code>@import 'partails/header.scss';</code>
- pug  - <code>include partails/header.pug</code>
- js   - <code>//import('partails/app.js')</code>

Таски 4,5,6 не выполняют минификацию, "причесывание" файлов, они конкатенируют и компилируют файлы.
Для минификации, "причесывания" файлов используйте таски 1,2,3.

Функциональность была разделена для более быстрой обработки файлов. До разделения js файлы в проекте  собирались - 10 сек., после разделения - 100 мс.
