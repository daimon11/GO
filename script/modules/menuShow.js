const overlay = document.querySelector('.menu-wrapper');
const menuList = document.querySelector('.menu__list');
const btnCall = document.querySelector('.header__button-call');

let startTime = NaN;
let endTime = NaN;

const durationMoving = 400;
const durationOpacity = 100;
let distance = Math.abs(menuList.offsetTop);

let requestId = NaN;
let requestEndId = NaN;

// отключение и включение скроллинга
let disableScroll = () => {
	let pagePosition = window.scrollY;
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

let enableScroll = () => {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	window.scroll({ top: pagePosition, left: 0 });
	document.body.removeAttribute('data-position');
}

// получить значение translateY
const getTranslateYValue = (translateString) => {
  let n = translateString.indexOf("(");
  let n1 = translateString.indexOf(")");

  let res = translateString.slice(n + 1, n1 - 2);
  return +res;
};

// закрыть окно
const hideOverlay = () => {
  overlay.style.zIndex = -1;
  endTime ||= performance.now();

  const progress = (performance.now() - endTime) / durationOpacity;
  overlay.style.opacity = 1 - progress;

  if (progress < 1) {
    requestAnimationFrame(hideOverlay);
  } else {
    overlay.style.opacity = 0;

  }
};

const endAnimation = (btn, duration, callback) => {
  let endAnimation = NaN;

  requestEndId = requestAnimationFrame(function stepBack() {
    endAnimation ||= performance.now();

    const progress = (performance.now() - endAnimation) / duration;

    callback(progress);
    if (progress < 1) {
      requestEndId = requestAnimationFrame(stepBack);
    } else {
      hideOverlay();
      btn.classList.remove('menu__btn-list--type_open');
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
    } else {
      btnCall.classList.remove('header__button-call--size_small');
    }
  });
};

export const rollUpMenu = (btnMenu) => {
  enableScroll();
  const elemTranslateYValue = getTranslateYValue(menuList.style.transform);
  btnCall.classList.add('header__button-call--size_small');
  endAnimation(btnMenu, durationMoving, (progress) => {
    const topBack = progress * distance;
    menuList.style.transform = `translateY(${elemTranslateYValue - topBack}px)`;
  });
};

const unwrapMenu = () => {
  startAnimation(durationMoving, (progress) => {
    const top = progress * distance;
    menuList.style.transform = `translateY(${top}px)`;
  });
};

export const openOverlay = () => {

  disableScroll();
  overlay.style.zIndex = 3;
  startTime ||= performance.now();

  const progress = (performance.now() - startTime) / durationOpacity;
  overlay.style.opacity = progress;

  if (progress < 1) {
    requestAnimationFrame(openOverlay);
  } else {
    overlay.style.opacity = 1;
    unwrapMenu();
  }
};

window.addEventListener('resize', e => {
  distance = Math.abs(menuList.offsetTop);
  if (window.innerWidth > 960) {
    menuList.removeAttribute('style');
    overlay.removeAttribute('style');
    document.querySelector('.menu__btn-list').classList.remove('menu__btn-list--type_open');
  }
}, true);