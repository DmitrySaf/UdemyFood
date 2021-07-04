window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const tabWrapper = document.querySelector('.tabheader__items'),
          listItem = document.querySelectorAll('.tabheader__item'),
          content = document.querySelectorAll('.tabcontent');

    let style = (elem, def) => {
        elem.style.display = `${def}`;
    };
    function elemIndex(node) {
        var index = 0;
        while ((node = node.previousElementSibling)) {
        index++;
        }
        return index;
    }

    content.forEach(item => {
        item.style.display = 'none';
    });
    
    style(content[0], "block");

    tabWrapper.addEventListener('click', (e) => {
        const target = e.target;
        listItem.forEach( (item, i) => {
            if (item.classList.contains('tabheader__item_active')) {
                item.classList.remove('tabheader__item_active');
            }
            style(content[i], "none");
        });
        if (!(target && target.matches('div.tabheader__item_active'))) {
            target.classList.add('tabheader__item_active');
            content[elemIndex(target)].style.display = 'block';
        }
    });

    //timer

    let dateDay = document.querySelector('#days'),
        dateHour = document.querySelector('#hours'),
        dateMinute = document.querySelector('#minutes'),
        dateSecond = document.querySelector('#seconds'),
        dateNow = new Date(),
        dateExp = new Date(2021, 5, 30),
        dateCountdown = dateExp - dateNow;
    
    function setClock(){
        const timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            dateDay.textContent = Math.floor(dateCountdown / (1000*60*60*24));
            dateHour.textContent = Math.floor((dateCountdown / (1000*60*60)) % 24);
            dateMinute.textContent = Math.floor((dateCountdown / (1000*60)) % 60);
            dateSecond.textContent = Math.floor((dateCountdown / (1000)) % 60);

            if (dateNow === dateExp) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock();
});
