import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalButton = $('.modal__close');
        this.events();
    }
    
    events() {
        // clicking open modal button 
        this.openModalButton.click(this.openModal.bind(this));

        // clicking X close modal button 
        this.closeModalButton.click(this.closeModal.bind(this));

        // pushes esc key 
        $(document).keyup(this.keyPressHandler.bind(this));
     }

     keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.closeModal();
        }
     }

    openModal() {
        this.modal.addClass('modal--visible');
        return false; 
    }

    closeModal() {
        this.modal.removeClass('modal--visible');
    }
}

export default Modal 