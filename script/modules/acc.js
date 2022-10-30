export const acc = (items, textWrapper) => {
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

