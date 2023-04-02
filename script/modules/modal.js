
export const closeModal = (modalWindow) => {
  modalWindow.classList.remove('modal_visible');
};

export const modalControl = (
  buttonCall, 
  buttonClose, 
  modalWindow,
  name,
  tel,
  ) => {
  
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



