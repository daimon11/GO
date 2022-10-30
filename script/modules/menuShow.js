const overlay = document.querySelector('.menu-wrapper');
const menuList = document.querySelector('.menu__list');

let startTime = NaN;
let endTime = NaN;

const durationMoving = 400;
const durationOpacity = 100;
const distance = 420;

let requestId = NaN;
let requestEndId = NaN;



// получить значение translateY
const getTranslateYValue = (translateString) => {
  let n = translateString.indexOf("(");
  let n1 = translateString.indexOf(")");

  let res = translateString.slice(n + 1, n1 - 2);
  return +res;
}

const elemTranslateYValue = getTranslateYValue(menuList.style.transform);

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

export const rollUpMenu = () => {
  btnCall.removeAttribute('disabled', 'disabled');
  endAnimation(durationMoving, (progress) => {
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

