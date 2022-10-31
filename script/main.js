import { acc } from './modules/acc.js';
import { modalControl } from './modules/modal.js';
import { rollUpMenu, openOverlay } from './modules/menuShow.js';

const init = () => {
  // modal
  const modalWindow = document.querySelector('.modal');
  const form = document.querySelector('.modal__form');
  const buttonCall =
    document.querySelector('.header__button-call');
  const buttonClose =
    document.querySelector('.modal__button-close');
  // acc
  const items = document.querySelectorAll('.faq__item');
  const textWrapper = document.querySelectorAll('.faq__text-wrapper');
  const btns = document.querySelectorAll('.faq__btn');
  const screenWidth = document.documentElement.scrollWidth;
  // menuShow
  const header = document.querySelector('.header');
  const btnMenu = document.querySelector('.menu__btn-list');

  modalControl(buttonCall, buttonClose, modalWindow, form);
  acc(items, textWrapper, btns, screenWidth);

  header.addEventListener('click', e => {
    const target = e.target;
    if (target === btnMenu && btnMenu.classList.contains('menu__btn-list--type_open')
      || target.closest('.menu-wrapper')) {
      // btnCall.removeAttribute('disabled', 'disabled');
      rollUpMenu();
    };
    if (target === btnMenu && !(btnMenu.classList.contains('menu__btn-list--type_open'))) {
      openOverlay();
      btnMenu.classList.add('menu__btn-list--type_open');
      // btnCall.setAttribute('disabled', 'disabled');
    }
  });
};

init();
