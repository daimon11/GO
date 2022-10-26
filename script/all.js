

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
const acc = (items, textWrapper, btns, screenWidth) => {
  let heightWrapper = 0;

  textWrapper.forEach(elem => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    }
  });

  if (screenWidth < 1150) {
    btns.forEach((btn) => {
      btn.classList.remove('faq__btn-light');
      if (!(btn.classList.contains('faq__btn-dark'))) {
        btn.classList.add('faq__btn-dark')
      }
    })
  }
  
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          if (screenWidth > 1150 && btns[i].classList.contains('faq__btn-light')) {
            btns[i].classList.toggle('faq__btn-light--active');
          } else {
            btns[i].classList.toggle('faq__btn-dark--active');
            btns[i].classList.toggle('faq__btn-dark');
          }
          textWrapper[i].style.height = items[i].classList.contains('faq-item_active') ?
            '' : `${heightWrapper}px`;
          items[i].classList.toggle('faq-item_active');
        } else {
          btns[i].classList.remove('faq__btn-dark--active');
          btns[i].classList.remove('faq__btn-light--active');
          items[i].classList.remove('faq-item_active');
          textWrapper[i].style.height = 0;
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
  const btns = document.querySelectorAll('.faq__btn');
  const screenWidth = document.documentElement.scrollWidth;

  modalControl(buttonCall, buttonClose, modalWindow, form);
  acc(items, textWrapper, btns, screenWidth);
};

init();
