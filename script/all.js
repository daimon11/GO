// menu-list

let startTime = NaN;
let endTime = NaN;

const durationMoving = 400;
const durationOpacity = 150;
const distance = 420;

let requestId = NaN;
let requestEndId = NaN;

const header = document.querySelector('.header');
const headerLogo = document.querySelector('.header__logo-img');
const btnCall = document.querySelector('.header__button-call');

const overlay = document.querySelector('.menu-wrapper');
const menuList = document.querySelector('.menu__list');
const btnMenu = document.querySelector('.menu__btn-list');

// получить значение translateY

function getTranslateYValue(translateString) {

  let n = translateString.indexOf("(");
  let n1 = translateString.indexOf(")");

  let res = translateString.slice(n + 1, n1 - 2);
  return +res;
}


// закрыть окно

const hideOverlay = () => {
  endTime ||= performance.now();

  const progress = (performance.now() - endTime) / durationOpacity;
  overlay.style.opacity = 1 - progress;

  if (progress < 1) {
    requestAnimationFrame(hideOverlay);
  } else {
    overlay.style.opacity = 0;
    btnMenu.classList.remove('menu__btn-list--type_open');
  }
};

const endAnimation = (duration, callback) => {
  let endAnimation = NaN;

  requestEndId = requestAnimationFrame(function stepBack() {
    endAnimation ||= performance.now();

    const progress = (performance.now() - endAnimation) / duration;

    callback(progress);
    if (progress < 1) {
      requestEndId = requestAnimationFrame(stepBack);
    } else {
      hideOverlay();
    }
  });
};

const startAnimation = (duration, callback) => {
  let startAnimation = NaN;

  requestId = requestAnimationFrame(function step() {
    startAnimation ||= performance.now();

    const progress = (performance.now() - startAnimation) / duration;

    callback(progress);
    if (progress < 1) {
      requestId = requestAnimationFrame(step);
    }
  });
};

const openOverlay = () => {
  startTime ||= performance.now();

  const progress = (performance.now() - startTime) / durationOpacity;
  overlay.style.opacity = progress;
  if (progress < 1) {
    requestAnimationFrame(openOverlay);
  } else {
    overlay.style.opacity = 1;
    const open = () => {
      startAnimation(durationMoving, (progress) => {
        const top = progress * distance;
        menuList.style.transform = `translateY(${top}px)`;
      });
    };
    open();
  }
};


header.addEventListener('click', e => {
  const target = e.target;
  if (target === btnMenu && btnMenu.classList.contains('menu__btn-list--type_open') || target.closest('.menu-wrapper')) {
    const end = () => {
      btnCall.removeAttribute('disabled', 'disabled');
      const elemTranslateYValue = getTranslateYValue(menuList.style.transform);
      endAnimation(durationMoving, (progress) => {
        const topBack = progress * distance;
        menuList.style.transform = `translateY(${elemTranslateYValue - topBack}px)`;
      });
    };
    end();
  };
  if (target === btnMenu && !(btnMenu.classList.contains('menu__btn-list--type_open'))) {
    openOverlay();
    btnMenu.classList.add('menu__btn-list--type_open');
    btnCall.setAttribute('disabled', 'disabled');
  }
});




// открыть окно
// const openMenu = (timestamp) => {
//   console.log(timestamp);
//   startTime ||= timestamp;
//   const progress = (timestamp - startTime) / durationMoving;
//   topEl = ((timestamp - startTime) / durationMoving) * 123;

//   menuList.style.transform = `translateY(${topEl}px)`;
//   if (progress < 1) {
//     requestAnimationFrame(openMenu);
//   } else {
//     startTime = NaN;
//     // btnMenu.classList.add('visually-hidden');
//     // const btnOpen = document.createElement('button');
//     // btnOpen.classList.add('menu__btn-list--type_open');
//     // headerWrapper.insertAdjacentElement('afterbegin', btnOpen);
//   }
// };





// btnMenu.addEventListener('click', openOverlay);
// headerLogo.addEventListener('click', removeEl);

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
  console.log('работает')
};

init();
