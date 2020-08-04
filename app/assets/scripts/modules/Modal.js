class Modal {
	constructor() {
		this.injectHTML();
		this.modal = document.querySelector('.modal');
		this.closeIcon = document.querySelector('.modal__close');
		this.events();
	}

	events() {
		// listen for closeClick
		this.closeIcon.addEventListener('click', () => this.closeTheModal());

		// listen for anyKey
		document.addEventListener('keyup', (e) => this.keyPressHandler(e));
	}

	openTheModal() {
		this.modal.classList.add('modal--visible');
	}

	closeTheModal() {
		this.modal.classList.remove('modal--visible');
	}

	keyPressHandler(e) {
		// escape keyCode = 27
		if (e.keyCode === 27) {
			this.closeTheModal();
		}
	}

	injectHTML() {
		document.body.insertAdjacentHTML(
			'beforeend',
			`
      <div class="modal">
        <div class="modal__inner">
          <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg"
              class="section-title__icon"> Get in <strong>Touch</strong></h2>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on
              any of the platforms below!</p>
          </div>

          <div class="social-icons">
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
          </div>
        </div>
        <div class="modal__close">&times;</div>
      </div>
      `
		);
	}
}

export default Modal;
