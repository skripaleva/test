const slider = document.querySelector('.slider');
const sliderMin = document.getElementById('sliderMin');
const sliderMax = document.getElementById('sliderMax');
const inputMin = document.getElementById('inputMin');
const inputMax = document.getElementById('inputMax');
const sliderHandleSize = 13;
const sliderBegin = 13;
const minCost = 1000;
const maxCost = 1000000;
const arrInputs = [inputMin, inputMax];
const arrSliders = [sliderMin, sliderMax];

arrInputs.forEach((inputObj) => {
    inputObj.oninput = (event) => {
        event.preventDefault();
        const sliderWidth = slider.offsetWidth;
        const sliderEnd = sliderWidth - sliderHandleSize * 2;
        const sliderLength = sliderEnd - sliderBegin;


        if (inputObj.value < minCost) {
            inputObj.value = minCost;
        }

        if (inputObj.value > maxCost) {
            inputObj.value = maxCost;
        }

        document.getElementById('slider' + inputObj.id.substr(5)).style.left = String(Math.floor(inputObj.value * sliderLength / maxCost) + sliderHandleSize) + 'px';
    }
});

arrSliders.forEach((sliderObj) => {
    sliderObj.onmousedown = (event) => {
        event.preventDefault();
        let previousValue;
        if (sliderObj.id === 'sliderMin') {
            previousValue = document.getElementById('inputMax').value;
        } else {
            previousValue = document.getElementById('inputMin').value;
        }

        let shiftX = event.clientX - sliderObj.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
            const sliderWidth = slider.offsetWidth;
            const sliderEnd = sliderWidth - sliderHandleSize * 2;
            const sliderLength = sliderEnd - sliderBegin;
            const rightEdge = slider.offsetWidth - sliderObj.offsetWidth;
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

            if (newLeft < 0) {
                newLeft = 0;
            }

            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            let newCost = (Math.floor((newLeft - sliderHandleSize) / sliderLength * maxCost));

            if (sliderObj.id === 'sliderMin') {
                if ((newLeft >= sliderBegin) && (newLeft < sliderEnd-sliderHandleSize)) {
                    if (newCost < previousValue) {
                        if (newLeft === sliderBegin) {
                            newCost = minCost;
                        }

                        document.getElementById('input' + sliderMin.id.substr(6)).value = String(newCost);
                        sliderMin.style.left = newLeft + 'px';
                    }
                }
            } else {
                if ((newLeft > sliderBegin+sliderHandleSize) && (newLeft <= sliderEnd)) {
                    if (newCost > previousValue) {
                        document.getElementById('input' + sliderMax.id.substr(6)).value = String(newCost);
                        sliderMax.style.left = newLeft + 'px';
                    }
                }
            }
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }
});