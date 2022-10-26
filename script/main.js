import {acc} from './modules/acc.js';
import {modalControl} from './modules/modal.js';

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
  const btns = document.querySelectorAll('.faq__btn-img');
  const screenWidth = document.documentElement.scrollWidth;

  modalControl(buttonCall, buttonClose, modalWindow, form);
  acc(items, textWrapper, btns, screenWidth);
};

init();
