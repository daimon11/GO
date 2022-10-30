// modal

const closeModal = (modalWindow) => {
  modalWindow.classList.remove('modal_visible');
};

const modalControl = (buttonCall, buttonClose, modalWindow) => {
  
  buttonCall.addEventListener('click', () => {
    modalWindow.classList.add('modal_visible');
  });

  modalWindow.addEventListener('click', e => {
    const target = e.target;
    if (target === buttonClose || target === modalWindow) {
      closeModal(modalWindow);
    }
  });
};

// acc

const acc = (items, textWrapper) => {
  let heightWrapper = 0;

  textWrapper.forEach(elem => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    }
  });

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          textWrapper[i].style.height = items[i].classList.contains('faq-item_active') ?
            '' : `${heightWrapper}px`;
          items[i].classList.toggle('faq-item_active');
          items[i].classList.toggle('faq__item--type_open');
          items[i].classList.toggle('faq__item--type_close');
        } else {

          items[i].classList.remove('faq__item--type_open');
          items[i].classList.remove('faq-item_active');
          textWrapper[i].style.height = 0;
          items[i].classList.add('faq__item--type_close');
        }
      }
    });
  });
};

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

  modalControl(buttonCall, buttonClose, modalWindow, form);
  acc(items, textWrapper);
};

init();