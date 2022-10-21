export const acc = (items, textWrapper, btns, screenWidth) => {
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
  
  btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          if (screenWidth > 1150 && btns[i].classList.contains('faq__btn-dark')) {
            btns[i].classList.toggle('faq__btn-dark--active');
          } else {
            btns[i].classList.toggle('faq__btn-light--active');
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
}

