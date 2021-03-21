const slider = document.querySelector('.slider');
const sliderMin = document.querySelector('.slider-min');
const sliderMax = document.querySelector('.slider-max');
const inputMin = document.getElementById('inputMin');
const inputMax = document.getElementById('inputMax');

const ar = [sliderMin, sliderMax];
ar.forEach((e) => {
    e.onmousedown = function (event) {
        event.preventDefault(); // предотвратить запуск выделения (действие браузера)

        let shiftX = event.clientX - e.getBoundingClientRect().left;
        // shiftY здесь не нужен, слайдер двигается только по горизонтали

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

            // курсор вышел из слайдера => оставить бегунок в его границах.
            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = slider.offsetWidth - e.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            if (e.getAttribute('class') === 'slider-min') {
                inputMin.setAttribute('value', String(Math.floor(newLeft/276*1000000)));
            } else {
                inputMax.setAttribute('value', String(Math.floor(newLeft/276*1000000)));
            }

            e.style.left = newLeft + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }

    e.ondragstart = function() {
        return false;
    };
})

























// let startCursorX;
// let startX;
// // let maxX;
// // maxX = sliderMax.style;
// // console.log('maxX', maxX);
//
// sliderMin.addEventListener('dragstart',function() {
//     startCursorX = event.pageX;//Начальная позиция курсора по оси X
//     //startCursorY = event.pageY;//Начальная позиция курсора по оси Y
//     startX = sliderMin.style.left.replace('px','')*1; // Нам нужны только цыфры без PX
//     //console.log(startCursorX);
//     console.log(startX);
//
//
//     //startY = sliderMin.style.marginTop.replace('px','')*1;
// });
// sliderMin.addEventListener('dragend',function() {
//     //sliderMin.style.position = 'absolute';//CSS теперь элемент "Блуждающий" :)
//     if ( startX < 0) {
//         sliderMin.style.left = 0 + 'px';
//     } else {
//         sliderMin.style.left = startX + event.pageX - startCursorX + 'px'; //позиция элемента + позиция курсора - позиция курсоа в начале перетаскивания
//     }
// });