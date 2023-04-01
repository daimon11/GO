import { acc } from './modules/acc.js';
import { modalControl } from './modules/modal.js';
import { rollUpMenu, openOverlay } from './modules/menuShow.js';

const modalOrderTitle = document.querySelector('.modal__title');
const modalOrderFieldset = document.querySelector('.modal__form-box');

const modalInputTel = document.querySelector('[name="tel"]');
const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(modalInputTel);

const modalInputName = document.querySelector('[name="name"]');
const justValidate = new JustValidate('.modal__form');
justValidate
  .addField(modalInputName, [
    {
      rule: 'required',
      errorMessage: 'Укажите ваше имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Не короче 2х символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное имя',
    },
  ])
  .addField(modalInputTel, [
    {
      rule: 'required',
      errorMessage: 'Укажите ваше телефон',
    },
    {
      validator(value) {
        const phone = modalInputTel.inputmask.unmaskedvalue();
        // console.log(phone);
        return !!(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Телефон не корректный'
    }
  ])
  .onSuccess(event => {
    const target = event.target;

    axios.post('https://jsonplaceholder.typicode.com/posts', {
      name: target.name.value,
      tel: modalInputTel.inputmask.unmaskedvalue(),
    })
      .then(response => {
        console.log(target);
        target.reset();
        modalOrderFieldset.disabled = true;
        modalOrderTitle.textContent = `Ваща заявка принята, номер заявки ${response.data.id}!!!`;
      })
      .catch(err => {
        console.error(err);
        modalOrderFieldset.disabled = false;
        modalOrderTitle.textContent = `Что-то пошло не так, ошибка!!!`;
      })
  })

const init = () => {
  // modal
  const modalWindow = document.querySelector('.modal');
  const buttonCall = document.querySelector('.header__button-call');
  const buttonClose = document.querySelector('.modal__button-close');
  // acc
  const items = document.querySelectorAll('.faq__item');
  const textWrapper = document.querySelectorAll('.faq__text-wrapper');
  const btns = document.querySelectorAll('.faq__btn');
  const screenWidth = document.documentElement.scrollWidth;
  // menuShow
  const header = document.querySelector('.header');
  const btnMenu = document.querySelector('.menu__btn-list');

  modalControl(
    buttonCall,
    buttonClose,
    modalWindow,
    modalInputName,
    modalInputTel
  );
  acc(items, textWrapper, btns, screenWidth);

  header.addEventListener('click', e => {
    const target = e.target;
    console.log(target);
    if (target === btnMenu && btnMenu.classList.contains('menu__btn-list--type_open') || target.closest('.menu__link') && btnMenu.classList.contains('menu__btn-list--type_open') || target === document.querySelector('.menu-wrapper') || target === document.querySelector('.header__button-call')) {
      rollUpMenu(btnMenu);
    };
    if (target === btnMenu && !(btnMenu.classList.contains('menu__btn-list--type_open')) && window.innerWidth <= 960) {
      btnMenu.classList.add('menu__btn-list--type_open');
      openOverlay();
    }
  });

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,

    navigation: {
      nextEl: '.sliper__button-right',
      prevEl: '.sliper__button-left',
    },
  });

};

init();
