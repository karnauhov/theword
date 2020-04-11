<template>
  <v-container>
    <div class="title">Открытие меню: <v-btn color="info"><v-img class="shrink" contain src="assets/book.png" width="32"/></v-btn></div>
    <div class="body-1"><v-icon>mdi-gesture-tap</v-icon> Касание кнопки меню или <v-icon>mdi-gesture-swipe-right</v-icon> горизонтальное скольжение пальцем от левого края экрана до середины.</div>
    <div class="body-1"><v-icon>mdi-mouse</v-icon> Нажатиие левой кнопки мыши над кнопкой меню.</div>
    <div class="body-1"><v-icon>mdi-keyboard</v-icon> Нажатие клавиш "Ctrl" + "S" на клавиатуре.</div>

    <br>
    <div class="title">Навгация по меню: </div>
    <div class="body-1"><v-icon>mdi-gesture-swipe-vertical</v-icon> Вертикальное скольжение пальцем над меню и <v-icon>mdi-gesture-tap</v-icon> касание пункта меню.</div>
    <div class="body-1"><v-icon>mdi-mouse</v-icon> Прокручивание колесика мыши и нажатие левой кнопки мыши над пунктом меню.</div>
    <div class="body-1"><v-icon>mdi-keyboard</v-icon> Нажатиие клавиш "Ctrl" + ("0" - "8") на клавиатуре для выбора первой главы в каждом разделе. Для выбора других глав использование клавиш "Tab" и "Shift" + "Tab" для перемещения фокуса и нажатие "Enter" или "Пробел".</div>

    <br>
    <div class="title">Навгация по странице: </div>
    <div class="body-1"><v-icon>mdi-gesture-swipe-vertical</v-icon> Вертикальное скольжение пальцем над содержимым главы и <v-icon>mdi-gesture-tap</v-icon> касание кнопок с номерами страниц. Также для перехода к следующей странице достаточно выполнить <v-icon>mdi-gesture-swipe-left</v-icon> скольжение пальцем справо налево. А для перехода к предыдущей страниице выполните <v-icon>mdi-gesture-swipe-right</v-icon> скольжение пальцем слева направо.</div>
    <div class="body-1"><v-icon>mdi-mouse</v-icon> Прокручивание колесика мыши и нажатие левой кнопки мыши над номерами страниц.</div>
    <div class="body-1"><v-icon>mdi-keyboard</v-icon> Использование клавиш стрелок "Вверх" и "Вниз" для просмотра содержимого страницы. Для выбора других страниц - использование клавиш "Tab" и "Shift" + "Tab" для перемещения фокуса и нажатие "Enter" или "Пробел".</div>

    <br>
    <div class="title">Раскрытие вложенного комментария: <v-icon class="mx-0" color="teal">mdi-arrow-down-circle</v-icon></div>
    <div class="body-1"><v-icon>mdi-gesture-tap</v-icon> Касание комментария.</div>
    <div class="body-1"><v-icon>mdi-mouse</v-icon> Нажатие левой кнопки мыши над комментарием.</div>
    <div class="body-1"><v-icon>mdi-keyboard</v-icon> Получене "фокуса" коментарием с помощью клавиш "Tab" и "Shift" + "Tab" и нажатие "Enter" или "Пробел".</div>
  </v-container>
</template>

<script>
  export default {
    name: 'Help',
  }
</script>
