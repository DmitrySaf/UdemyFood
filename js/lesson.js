window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', e => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const deadline = '2021-07-11';
    
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setZero(arg) {
        if (arg >= 0 && arg < 10) {
            return `0${arg}`;
        }
        return arg;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //MODAL

    const openModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          closeModal = document.querySelector('[data-close]');

    function actionsModal(arg) {
        modal.style.display = arg;
        clearInterval(modalCountdown);
    }   

    openModal.forEach(item => {
        item.addEventListener('click', e => {
            actionsModal('block');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', e => {
        actionsModal('none');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal){
            actionsModal('none');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            actionsModal('none');
        }
    });

/*     const modalCountdown = setTimeout( () => {
        actionsModal('block');
    }, 3000); */

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
            actionsModal('block');
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    const img = 'img/tabs/hamburger.jpg',
          title = 'Фаст',
          descr = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
          price = 224;
    const container = '[data-tabs]';


    class MenuItem {
        constructor( img, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        htmlIn(){
            const elem = document.createElement('div');
            if (this.classes.length === 0){
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }
            elem.innerHTML = `
                <img src=${this.img} alt="vegy">
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    }

//    new MenuItem(img, title, descr, price, container).htmlIn();

    new MenuItem (
        "img/tabs/vegy.jpg",
        "Фитнес",
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        container,
    ).htmlIn();

    new MenuItem (
        "img/tabs/elite.jpg",
        "Премиум",
        'В меню “Премиум” мы используем не только красивый дизайн <br> упаковки, но и качественное исполнение блюд. Красная рыба, <br> морепродукты, фрукты - <br> ресторанное меню без похода в ресторан!',
        550,
        container,
    ).htmlIn();

    new MenuItem (
        "img/tabs/post.jpg",
        "Постное",
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        container,
    ).htmlIn();

// forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Все прошло успешно!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if( request.status == 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
    let srm = 5;
    let test = 'test';
    let DB = {
        name: 'bibi'
    };
});